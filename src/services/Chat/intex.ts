"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const getMyChatRequests = async()=>{
    try {
        const token = (await cookies()).get("accessToken")?.value
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat/chat-requests`,{
            method:"GET",
            headers:{
                Authorization:token as string,
            },
            next:{
                tags:["chatRequest", "cancelRequest"]
            }
        })
        
        const data = await result.json()
        return data

    } catch (error) {
        console.log(error)
    }
}

export const handleChatRequest = async(payload:FieldValues)=>{
    try {
        const token = (await cookies()).get("accessToken")?.value
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat/handle-chat-request`,{
            method:"PATCH",
            headers:{
                Authorization:token as string,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        revalidateTag("chatRequest")
        const data = await result.json()
        return data

    } catch (error) {
        console.log(error)
    }
}


export const sendChatrequest = async(classroomId:string)=>{
    try {
        const token = (await cookies()).get("accessToken")?.value
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat/send-chat-request/${classroomId}`,{
            method:"POST",
            headers:{
                Authorization:token as string,
            },
        })

        const data = await result.json()
        return data

    } catch (error) {
        console.log(error)
    }
}
export const cancelChatrequest = async(chatId:string)=>{
    try {
        const token = (await cookies()).get("accessToken")?.value
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat/cancel-chat-request/${chatId}`,{
            method:"DELETE",
            headers:{
                Authorization:token as string,
            },
        })
        revalidateTag("cancelRequest")
        const data = await result.json()
        return data

    } catch (error) {
        console.log(error)
    }
}


