"use client";

import { useUser } from "@/context/UserContext";
import moment from "moment";
import { HiPresentationChartLine } from "react-icons/hi2";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { IoIosTime } from "react-icons/io";
import NavigationLink from "./NavigationLink";
import { RiMenuFold2Fill } from "react-icons/ri";
import { TbCirclePlus2 } from "react-icons/tb";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { cn } from "@/lib/utils";
import { DialogDescription } from "../ui/dialog";
import { IUser } from "@/types/user";
import { PiStudentFill } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";

const DashboardNavbar = () => {
  const { user, isLoading } = useUser();
  const createdAt = new Date(user?.createdAt as string);
  const joinedSince = moment(createdAt).calendar();
  
  
  return (
    <div className="">
      <div className="flex justify-between items-center   md:ml-[80px] px-[3vw] py-4">
        <div className="flex items-center gap-3">
          <Drawer direction="left">
            <DrawerTrigger>
              <RiMenuFold2Fill className="text-4xl md:hidden" />
            </DrawerTrigger>
            <DrawerContent className="bg-green-100 border-none">
              <DrawerTitle />
              {
                isLoading ?<></> :<Sidebar user={user} className="flex flex-col mt-[72px]" />
              }
               
              <DialogDescription />
            </DrawerContent>
          </Drawer>
          <h1 className="text-4xl">Dashboard</h1>
        </div>
        <p className="text-sm text-gray-400 bg-white px-4 py-1 rounded-l-xl rounded-tr-xl font-semibold md:flex hidden">
          Joined {joinedSince}
        </p>
      </div>
      {
        isLoading? <SidebarSkeleton/> : <Sidebar
        user={user}
        className="top-[72px] md:left-0 -left-[80px]  absolute"
      />
      }
      
    </div>
  );
};

const Sidebar = ({
  className,
  user,
}: {
  className?: string;
  user: IUser | null;
}) => {
  const path = usePathname().split("/")[3]
  return (
    <div className={cn(" min-h-[calc(100vh-72px)]   py-[3vh] px-4", className)}>
      <div className="flex flex-col justify-between min-h-[80vh] ">

      <div className="flex flex-col gap-4">
        <NavigationLink
          href="/"
          Icon={FaHome}
          text="Home"
          />
        {
          (user?.role === "student") && <NavigationLink
          href="/student/dashboard/attendance"
          Icon={HiPresentationChartLine}
          text="Attendance Statistics"
          isActive={path === "attendance"}  
          />
        }
        <NavigationLink
          Icon={IoIosTime}
          href={
            user?.role === "student"
            ? "/student/dashboard/my-routine"
            : "/faculty/dashboard/my-routine"
          }
          text="Class Schedule"
          isActive={path === "my-routine"}  
          />
        <NavigationLink
          Icon={PiChalkboardTeacherFill}
          text="Manage Classes"
          href={
            user?.role === "student"
            ? "/student/dashboard/manage-classes"
            : "/faculty/dashboard/manage-classes"
          }
            isActive={path === "manage-classes"}
          />
        {user?.role === "faculty" && (
          <NavigationLink
          Icon={PiStudentFill}
          text="Manage Students"
          href={"/faculty/dashboard/manage-students"}
          isActive={path === "manage-students"}
          />
        )}
        {user?.role === "faculty" && (
          <NavigationLink
          Icon={TbCirclePlus2}
          text="Chat Requests"
          href={"/faculty/dashboard/chat-requests"}
          isActive={path === "chat-requests"}
          />
        )}
        </div>
        <NavigationLink
        Icon={()=>Profile({image:user!.profileImage})}
        text={user?.name as string}
        href={"/profile"}
        
        />
        </div>
    </div>
  );
};

const Profile =({image}:{image:string})=>{
 return(
  <Avatar className="size-12 mx-auto">
    <AvatarImage className="bg-white " src={image} alt="profile" /> 
    <AvatarFallback>
      P
    </AvatarFallback>
  </Avatar>
 )
}

const SidebarSkeleton =() =>{
  return (
    <div className="top-[72px] md:left-0 -left-[80px] px-4 h-[85vh] absolute flex flex-col justify-between">
      <Skeleton className="h-[30vh] w-12 bg-white opacity-30" />
      <Skeleton className="h-[10vh] rounded-full w-12 bg-white opacity-30" />
    </div>
  )
}

export default DashboardNavbar;
