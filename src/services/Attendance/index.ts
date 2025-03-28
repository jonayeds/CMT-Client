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

export const getMyAttendances = async()=>{
  try {
    const token = (await cookies()).get("accessToken")?.value
  const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/attendance/my-attendances`,{
    headers:{
      Authorization:`${token}`
    },
    method:"GET"
  })
  const data = await result.json()
  return data
  } catch (error) {
    console.log(error)
  }
  
}
