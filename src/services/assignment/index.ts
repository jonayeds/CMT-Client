"use server"

import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const createAssignment = async (data: FieldValues) => {
    const token = (await cookies()).get("accessToken")?.value 
    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/assignment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body:JSON.stringify(data)
    })
    const res = await result.json()   
    return res 
}