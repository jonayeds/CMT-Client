import { cookies } from "next/headers"

export const getClassroomContents = async(classroomId:string)=>{
   const token = (await cookies()).get("accessToken")?.value
       const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/content/classroom/${classroomId}`,{
           method:"GET",
           headers:{
               "Authorization":token as string,
           },
       })
       const result  = await res.json()
       return result
}