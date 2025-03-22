"use client";
import { IClassroom } from "@/types/classroom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/UserContext";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

const ClassroomCard = ({ classroom }: { classroom: IClassroom }) => {
  const { user } = useUser();
  return (
    <Link href={classroom._id} className="border border-gray-200  rounded-xl cursor-pointer shadow-sm hover:shadow-lg overflow-hidden duration-300">
      <div className="bg-gradient-to-tl from-gray-300 to-gray-500 text-white w-full p-4">
        <div className="flex justify-between items-center text-white">
        <h1 className="text-2xl ">{classroom.courseTitle}</h1>
        <EllipsisVertical className="hover:scale-125 duration-300 w-8 h-8 rounded-full p-1"/>
        </div>
        <p className="my-2">{classroom.courseCode}</p>
        <p className="text-sm ">
          {
            classroom.classDays.map((day,idx)=><span key={day} >{" "}{day} {((idx+1) < classroom.classDays.length) && " | "}</span>)
          }
        </p>
        <p className="text-sm">{classroom.startTime} - {classroom.endTime}</p>
        {user?.role === "student" && (
          <div className="flex items-center justify-between gap-2">
            <p className="text-white text-xs">{classroom.faculty.name}</p>
            <Avatar className="w-16 h-16">
              <AvatarImage className="" src={classroom.faculty.profileImage} />
              <AvatarFallback>
                {classroom.faculty.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ClassroomCard;
