import { getUserFromCookies } from "./services/AuthService";
import { NextRequest, NextResponse } from "next/server";
import { IJwtDecodedUser } from "./types/user";

const privateRoutes = {
  student: [
    "/my-classes",
    "/join-classroom",
    "/dashboard",
    "/student/dashboard/my-routine",
    "/student/dashboard/attendance",
    "/student/dashboard/manage-classes",
    "/student/dashboard/chats",
  ],
  faculty: [
    "/create-classroom",
    "/dashboard",
    "/my-classes",
    "/faculty/dashboard/my-routine",
    "/faculty/dashboard/manage-classes",
    "/faculty/dashboard/manage-students",
    "/faculty/dashboard/chat-requests",
    "/faculty/dashboard/chats",
  ],
};
const authRoutes = ["/login", "/register"];
export const middleware = async (request: NextRequest) => {
  const user = (await getUserFromCookies()) as IJwtDecodedUser | null;

  const { pathname } = request.nextUrl;

  const match = pathname.match(/^\/my-classes\/([^/]+)$/);
  const isQRCodeGenerator = pathname.match(
    /^\/my-classes\/([a-fA-F0-9]+)\/attendance-qr-code$/
  );
  if (isQRCodeGenerator && user?.role === "faculty") {
    return NextResponse.next();
  }
  const isAssignment = pathname.match(/^\/my-classes\/([a-fA-F0-9]+)\/assignment\/([a-fA-F0-9]+)$/)
  const isCreateAssignment = pathname.match(/^\/my-classes\/([a-fA-F0-9]+)\/create-assignment$/)
  if(isCreateAssignment && user?.role === "faculty"){
    return NextResponse.next(); 
  }
  if(isAssignment && user){
    return NextResponse.next();
  }
  if (match && user) {
    return NextResponse.next();
  }
  if (!user && authRoutes?.includes(pathname)) {
    return NextResponse.next();
  }
  if (!user) {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  } else if (
    !privateRoutes[user?.role as keyof typeof privateRoutes]?.includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (authRoutes?.includes(pathname) && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/my-classes",
    "/create-classroom",
    "/join-classroom",
    "/dashboard",
    "/login",
    "/register",
    "/my-classes/:classroomId",
    "/my-classes/:classroomId/assignment/:assignmentId",
    "/my-classes/:classroomId/attendance-qr-code",
    "/my-classes/:classroomId/create-assignment", 
    "/student/dashboard/my-routine",
    "/student/dashboard/attendance",
    "/student/dashboard/manage-classes",
    "/faculty/dashboard/my-routine",
    "/faculty/dashboard/manage-classes",
    "/faculty/dashboard/manage-students",
    "/faculty/dashboard/chat-requests",
    "/faculty/dashboard/chats",
    "/student/dashboard/chats",
  ],
};
