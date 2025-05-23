"use client"
import { Button } from "@/components/ui/button";
import { sendChatrequest } from "@/services/Chat/intex";
import { IClassroom } from "@/types/classroom";
import Link from "next/link";
import { toast } from "sonner";

const ClassroomBanner = ({
  classroom,
  role,
}: {
  classroom: IClassroom;
  role: string;
}) => {
  const handleRequestChat = async()=>{
    const id = toast.loading("Sending chat request...")
    const result = await sendChatrequest(classroom._id)
    if(result.success){
      toast.success(result?.message, {
        id
      })
    }else{
      toast.error(result?.message,{id})
    }
  }
  return (
    <div className="w-full bg-gradient-to-tr from-gray-500 hover:shadow-2xl shadow-md duration-500 text-white min-h-[25vh] flex-col  px-4 pt-24 flex justify-end to-gray-300 py-8 rounded-xl">
      <h1 className="md:text-[3vw] text-[7vw] font-serif truncate ">
        <span>{classroom.courseTitle}</span>{" "}
      </h1>
      <p className="my-1">
        {classroom.classDays.map(
          (day, idx) =>
            `${day} ${idx + 1 < classroom.classDays.length ? "| " : ""}`
        )}
      </p>
      <p>
        {classroom.startTime} - {classroom.endTime}
      </p>
      <p className="mt-2">
        {" "}
        <span className="">Joining code:</span>{" "}
        <span className="text-sm ml-2 tracking-wider">
          {classroom.joiningCode}
        </span>
      </p>
      {role === "faculty" ? (
        <Link
          className="bg-gradient-to-br from-white to-gray-300 hover:from-gray-300 hover:to-white  transition duration-700  text-black w-max px-4 py-1 mt-2 rounded-md"
          href={`/my-classes/${classroom._id}/attendance-qr-code`}
        >
          Attendance QR Code
        </Link>
      ) : (
        <Button
        onClick={handleRequestChat}
          className="bg-gradient-to-br from-white to-gray-300 hover:from-gray-300 hover:to-white  transition cursor-pointer duration-700 border-none  text-black w-max px-4 py-1 mt-2 rounded-md"
        >
         Request Chat
        </Button>
      )}
    </div>
  );
};

export default ClassroomBanner;
