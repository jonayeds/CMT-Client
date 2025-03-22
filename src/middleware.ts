import { getUser } from "./services/AuthService"
import { NextRequest, NextResponse } from "next/server"


const privateRoutes = {
    student:["/my-classes", "/join-classroom", "/dashboard"],
    teacher:["/create-classroom", "/dashboard"],
}
const authRoutes = ["/login", "/register"]
export const middleware = async(request:NextRequest)=>{
    const user = await getUser()
    const {pathname} = request.nextUrl
    if(!user){
        return NextResponse.redirect(new URL(`/login?redirectPath=${pathname}`, request.url))
    }else if(!privateRoutes[user?.role as keyof typeof privateRoutes]?.includes(pathname)){
        return NextResponse.redirect(new URL("/", request.url))
    }else if(authRoutes?.includes(pathname) && user){
        return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher:[
        "/my-classes",
        "/create-classroom",
        "/join-classroom",
        "/dashboard",
        "/login",
        "/register",
    ]
}