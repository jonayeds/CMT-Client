"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const updateAttendance = async (classroomId: string) => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/attendance/update-attendance/${classroomId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  revalidateTag("attendance");
  const data = await res.json();
  return data;
};
