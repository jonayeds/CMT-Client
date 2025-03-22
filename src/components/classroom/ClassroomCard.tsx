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
      <div className="bg-gradient-to-tl from-gray-300 to-gray-500 w-full p-4">
        <div className="flex justify-between items-center text-white">
        <h1 className="text-2xl ">{classroom.courseTitle}</h1>
        <EllipsisVertical className="hover:scale-125 duration-300 w-8 h-8 rounded-full p-1"/>
        </div>
        <p className="text-white">{classroom.courseCode}</p>
        {user?.role === "student" && (
          <div className="flex items-center gap-2">
            <p className="text-white">{classroom.faculty.name}</p>
            <Avatar>
              <AvatarImage src={classroom.faculty.profileImage} />
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
