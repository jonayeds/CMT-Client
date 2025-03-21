"use server"

import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const registerUser = async(data:FieldValues)=>{
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/register-user`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const resultData = await result.json()
        if(resultData?.success){
            (await cookies()).set("accessToken", resultData?.accessToken)
        }
        return resultData
    } catch (error) {
        console.log(error)
    }

}