/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const uploadContentToDropbox: any = async (files: File[]) => {
  try {
    const fileUrls: string[] = [];
    for (const file of files) {
      const fileData = await file.arrayBuffer();
      const accessToken =
        (await cookies()).get("dropboxAccessToken")?.value ||
        process.env.DROPBOX_ACCESS_TOKEN;
      const response = await fetch(
        "https://content.dropboxapi.com/2/files/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/octet-stream",
            "Dropbox-API-Arg": JSON.stringify({
              path: `/Apps/Classroom-next/${file.name}`,
              mode: "add",
              autorename: true,
              mute: false,
            }),
          },
          body: fileData,
        }
      );

      if (!response.ok) {
        if (response.statusText === "Unauthorized") {
          await refreshDropboxAccessToken(
            process.env.DROPBOX_REFRESH_TOKEN as string
          );
          
          return await uploadContentToDropbox(files);
        }

        return { succes: false, message: "Something went wrong!!!" };
      }

      const data = await response.json();
      const publicUrl = await getDropBoxPublicUrl(data.path_lower);
      fileUrls.push(publicUrl);
    }

    return { fileUrls };
  } catch (error) {
    console.log(error);
  }
};

export const getDropBoxPublicUrl:any = async (filePath: string) => {
  const accessToken = (await cookies()).get("dropboxAccessToken")?.value
  const res = await fetch(
    `https://api.dropboxapi.com/2/sharing/list_shared_links`,
    {
      method: "POST", 
      headers: {
        Authorization: `Bearer ${accessToken || process.env.DROPBOX_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        path:filePath
      })
    }
  );
  if(!res.ok && res.status === 401){
    await refreshDropboxAccessToken(process.env.DROPBOX_REFRESH_TOKEN as string)
    return getDropBoxPublicUrl(filePath)
  }
  if (res.ok) {
    const isLinkExists = await res.json();
    if (isLinkExists.links.length > 0) {
      return isLinkExists.links[0].url;
    }
  }
  const response = await fetch("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ accessToken || process.env.DROPBOX_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      path: filePath,
      settings: {
        requested_visibility: "public", // Makes the file public
      },
    }),
  });


  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Dropbox API Error: ${errorText}`);
  }

  const data = await response.json();
  return data.url;
};

export const refreshDropboxAccessToken = async (refreshToken: string) => {
  const clientId = process.env.DROPBOX_CLIENT_ID;
  const clientSecret = process.env.DROPBOX_CLIENT_SECRET;

  const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId as string,
      client_secret: clientSecret as string,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Dropbox Token Refresh Error: ${errorText}`);
  }

  const data = await response.json();
  (await cookies()).set("dropboxAccessToken", data.access_token);
};

export const uploadClassroomContent = async (payload: FieldValues) => {
  const token = (await cookies()).get("accessToken")?.value;
  const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/content`, {
    method: "POST",
    headers: {
      Authorization: token as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  revalidateTag("content")
  const data = await result.json();
  return data;
};

// const verifyToken = async (token: string) => {
//   const response = await fetch(
//     "https://api.dropboxapi.com/2/users/get_current_account",
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );
//   return response;
// };
