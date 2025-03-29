"use server"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const getMyChatRequests = async()=>{
    try {
        const token = (await cookies()).get("accessToken")?.value
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat/chat-requests`,{
            method:"GET",
            headers:{
                Authorization:token as string,
            }
        })
        const data = await result.json()
        return data

    } catch (error) {
        console.log(error)
    }
}

export const handleChatRequest = async(payload:FieldValues)=>{
    console.log(payload)
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
        const data = await result.json()
        return data

    } catch (error) {
        console.log(error)
    }
}