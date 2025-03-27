"use client";

import { useUser } from "@/context/UserContext";
import moment from "moment";
import { HiPresentationChartLine } from "react-icons/hi2";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { IoIosTime } from "react-icons/io";
import NavigationLink from "./NavigationLink";
import { RiMenuFold2Fill } from "react-icons/ri";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { cn } from "@/lib/utils";
import { DialogDescription } from "../ui/dialog";

const DashboardNavbar = () => {
  const { user } = useUser();
  const createdAt = new Date(user?.createdAt as string);
  const joinedSince = moment(createdAt).calendar();
  return (
    <div className="">
      <div className="flex justify-between items-center   md:ml-[80px] px-[3vw] py-4">
        <div className="flex items-center gap-3">
          <Drawer direction="left">
            <DrawerTrigger >
        <RiMenuFold2Fill className="text-4xl md:hidden" />
            </DrawerTrigger>
            <DrawerContent className="bg-green-100 border-none">
              <DrawerTitle/>
              <Sidebar className="flex flex-col mt-[72px]"/>
              <DialogDescription/>
            </DrawerContent>

          </Drawer>
        <h1 className="text-4xl">Dashboard</h1>
        </div>
        <p className="text-sm text-gray-400 bg-white px-4 py-1 rounded-l-xl rounded-tr-xl font-semibold md:flex hidden">
          Joined {joinedSince}
        </p>
      </div>
      <Sidebar className="top-[72px] md:left-0 -left-[80px]  absolute"/>
    </div>
  );
};


const Sidebar =({className}:{className?:string})=>{
  return (
    <div className={cn(" min-h-[calc(100vh-72px)]   py-[3vh] px-4", className)}>
        <div className="flex flex-col gap-4">
          <NavigationLink
            href="/student/dashboard/attendance"
            Icon={HiPresentationChartLine}
            text="Attendance Statistics"
          />

          <NavigationLink
            Icon={IoIosTime}
            href="/student/dashboard/my-routine"
            text="Class Schedule"
          />
          <NavigationLink
            Icon={PiChalkboardTeacherFill}
            text="Manage Classes"
            href="/student/dashboard/manage-classes"
          />
        </div>
      </div>
  )
}


export default DashboardNavbar;
