"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const createClassroom = async(data:FieldValues)=>{
    try {
        const token = (await cookies()).get("accessToken")?.value
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/classroom`,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`${token}`
            }
        })
        const response = await result.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getMyClasses = async()=>{
    try {
        const token = (await cookies()).get("accessToken")?.value
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/classroom/my-classrooms`,{
            method:"GET",
            headers:{
                "Authorization":`${token}`
            },
            next:{
                tags:["leave", "delete"]
            }
        })
        const response = await result.json()
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getASingleClassroom = async(classroomId:string)=>{
    try {
        const token = (await cookies()).get("accessToken")?.value
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/classroom/${classroomId}`,{
            method:"GET",
            headers:{
                "Authorization":`${token}`
            },
        })
        const response = await result.json()
        return response
    } catch (error) {
        console.log(error)
    }
}



export const  joinClassroom = async(data:FieldValues)=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/classroom/join-classroom`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":token as string,
        },
        body: JSON.stringify(data)
    })
    const result  = await res.json()
    return result
}

export const leaveClassroom =async(classroomId:string)=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/classroom/leave-classroom/${classroomId}`,{
        method:"DELETE",
        headers:{
            "Authorization":token as string,
        },
    })
    revalidateTag("leave")
    const result  = await res.json()
    return result
}

export const deleteClassroom =async(classroomId:string)=>{
    const token = (await cookies()).get("accessToken")?.value
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/classroom/${classroomId}`,{
        method:"DELETE",
        headers:{
            "Authorization":token as string,
        },
    })
    revalidateTag("delete")
    const result  = await res.json()
    return result
}

