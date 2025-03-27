"use client";

import { useUser } from "@/context/UserContext";
import moment from "moment";
import Link from "next/link";
import { HiPresentationChartLine } from "react-icons/hi2";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { IoIosTime } from "react-icons/io";

const DashboardNavbar = () => {
  const { user } = useUser();
  const createdAt = new Date(user?.createdAt as string);
  const joinedSince = moment(createdAt).calendar();
  return (
    <div className="">
      <div className="flex justify-between items-center   md:ml-[80px] px-[3vw] py-4">
        <h1 className="text-4xl">Dashboard</h1>
        <p className="text-sm text-gray-600 bg-gray-200 px-4 py-1 rounded-l-xl rounded-tr-xl font-semibold">
          Joined {joinedSince}
        </p>
      </div>
      <div className="top-[72px] md:left-0 -left-[80px]  absolute min-h-screen bg-green-100  py-[3vh] px-4">
        <div className="flex flex-col gap-4">  
              <Link href={"/student/dashboard/attendance"} className="relative group">
                <HiPresentationChartLine className="text-5xl rounded-full p-3 bg-white" />
                <div className="absolute truncate opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 top-[25%] rounded-md left-[120%] delay-200 duration-200 transition-all pointer-events-none text-xs bg-gray-500  px-2 py-1"> <p className="text-white">Attendance Statistics</p></div>
              </Link>
            
          <Link href={"/student/dashboard/my-routine"} className="relative group">
            <IoIosTime className="text-5xl rounded-full p-3 bg-white" />
            <div className="absolute truncate opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 top-[25%] rounded-md left-[120%] delay-200 duration-200 transition-all pointer-events-none text-xs bg-gray-500  px-2 py-1"> <p className="text-white">Class Schedule</p></div>
          </Link>
          <Link href={"/student/dashboard/attendance"} className="relative group">
            <PiChalkboardTeacherFill className="text-5xl rounded-full p-3 bg-white" />
            <div className="absolute truncate opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 top-[25%] rounded-md left-[120%] delay-200 duration-200 transition-all pointer-events-none text-xs bg-gray-500  px-2 py-1"> <p className="text-white">Manage classes</p></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
