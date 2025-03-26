import {  getUserFromCookies } from "./services/AuthService"
import { NextRequest, NextResponse } from "next/server"
import { IJwtDecodedUser} from "./types/user"


const privateRoutes = {
    student:["/my-classes", "/join-classroom", "/dashboard" ],
    faculty:["/create-classroom", "/dashboard", "/my-classes"],
}
const authRoutes = ["/login", "/register"]
export const middleware = async(request:NextRequest)=>{
    const user = await getUserFromCookies() as IJwtDecodedUser | null

    const {pathname} = request.nextUrl
    
    const match = pathname.match(/^\/my-classes\/([^/]+)$/);
    const isQRCodeGenerator = pathname.match(/^\/my-classes\/([a-fA-F0-9]+)\/attendance-qr-code$/)
    if(isQRCodeGenerator && (user?.role === "faculty")){
        console.log("hit here")
        return NextResponse.next()
    }
    if(match && user){
        return NextResponse.next()
    }
    if(!user && authRoutes?.includes(pathname)){
        return NextResponse.next()
    }
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
        "/my-classes/:classroomId",
        "/my-classes/:classroomId/attendance-qr-code"
    ]
}