import { cookies } from "next/headers"

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

export const acceptChatRequest = async()=>{

}