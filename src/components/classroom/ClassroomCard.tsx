"use client";
import { IClassroom } from "@/types/classroom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/UserContext";
import { EllipsisVertical, Loader2 } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MouseEvent, useState } from "react";
import { deleteClassroom, leaveClassroom } from "@/services/Classroom";
import { toast } from "sonner";

const ClassroomCard = ({ classroom }: { classroom: IClassroom }) => {

  const { user } = useUser();
  const [loading, setLoading] = useState(false)
  const handleDeleteClassroom  = async(e: MouseEvent)=>{
    e.preventDefault()
    setLoading(true)
    const result = await deleteClassroom(classroom._id)
    if(result.success){
      toast.success(result?.message)
      setLoading(false)
    }else{
      toast.error(result?.message)
      setLoading(false)
    }
  }
  const handleLeaveClassroom =async(e: MouseEvent)=>{
    e.preventDefault()
    setLoading(true)
    const result = await leaveClassroom(classroom._id)
    if(result.success){
      toast.success(result?.message)
      setLoading(false)
    }else{
      toast.error(result?.message)
      setLoading(false)
    }

  }
  return (
    <Link
      href={`/my-classes/${classroom._id}`}
      className="border border-gray-200  rounded-xl cursor-pointer shadow-sm hover:shadow-lg overflow-hidden duration-300"
    >
      <div className="bg-gradient-to-tl from-gray-300 to-gray-500 text-white w-full p-4">
        <div className="flex justify-between items-center text-white">
          <h1 className="text-2xl truncate">{classroom.courseTitle}</h1>
          <DropdownMenu >
            <DropdownMenuTrigger className="outline-none cursor-pointer">
              <EllipsisVertical className="hover:scale-125 duration-300 w-8 h-8 rounded-full p-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              {
                loading ? <Button  variant={"outline"} type="button" onClick={(e)=>e.preventDefault()} className="w-full from-red-400 hover:to-red-700 duration-300 transition to-red-600 bg-gradient-to-br text-white">
                  <div className="flex justify-center items-center h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div>
                </Button> : <Button  variant={"outline"} type="button" onClick={user?.role === "student" ? handleLeaveClassroom : handleDeleteClassroom} className="w-full from-red-400 hover:to-red-700 duration-300 transition to-red-600 bg-gradient-to-br text-white">{user?.role === "student" ? "Leave": "Delete"}</Button>
              }
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="my-2">{classroom.courseCode}</p>
        <p className="text-sm ">
          {classroom.classDays.map((day, idx) => (
            <span key={day}>
              {" "}
              {day} {idx + 1 < classroom.classDays.length && " | "}
            </span>
          ))}
        </p>
        <p className="text-sm">
          {classroom.startTime} - {classroom.endTime}
        </p>
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
