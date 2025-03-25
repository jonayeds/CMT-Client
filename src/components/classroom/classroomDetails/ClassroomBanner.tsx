
import { IClassroom } from "@/types/classroom"

const ClassroomBanner = ({classroom}:{classroom:IClassroom}) => {
  return (
    <div className="w-full bg-gradient-to-tr from-gray-500 hover:shadow-2xl shadow-md duration-500 text-white min-h-[25vh] flex-col  px-4 pt-24 flex justify-end to-gray-300 py-8 rounded-xl">
        <h1 className="md:text-[3vw] text-[7vw] font-serif ">{classroom.courseTitle}</h1>
        <p className="my-1">{classroom.classDays.map((day,idx)=>`${day} ${idx+1 < classroom.classDays.length ? "| ": ""}` )}</p>
        <p>{classroom.startTime} - {classroom.endTime}</p>
        <p className="mt-2"> <span className="">Joining code:</span> <span className="text-sm ml-2 tracking-wider">{classroom.joiningCode}</span></p>
    </div> 
  )
}

export default ClassroomBanner