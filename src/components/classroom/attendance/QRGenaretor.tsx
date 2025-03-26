
import { getASingleClassroom } from "@/services/Classroom"
import { IClassroom } from "@/types/classroom"
import { Dot } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import QRCode from "qrcode"


const QRGenaretor = async({classroomId}:{classroomId:string}) => {
  const {data:classroom}:{data:IClassroom} = await getASingleClassroom(classroomId)
  const now = moment().format("HH:mm")
  const today = moment().format("dddd")
  let qrCode;
  const currentTime = now.split(":").map(t=>Number(t))
  const currentTimeInMinutes = currentTime[0] * 60 + currentTime[1]
  const startTime = classroom.startTime.split(":").map(t=>Number(t))
  const startTimeInMinutes = startTime[0] * 60 + startTime[1]
  const endTime = classroom.endTime.split(":").map(t=>Number(t))
  const endTimeInMinutes = endTime[0] * 60 + endTime[1]
  const isBetweenClassTime = (currentTimeInMinutes >= startTimeInMinutes) ? (currentTimeInMinutes <= endTimeInMinutes) : false
  if(classroom.classDays.includes(today) && isBetweenClassTime){
    qrCode = await QRCode.toDataURL(classroomId)
  }


  return (
    <div className="min-h-[calc(100vh-300px)] flex justify-center items-center">
         {
          qrCode ? <Image src={qrCode} alt="qrCode" width={200} height={200} className="md:w-[20vw] w-[70vw]"  /> : <p className="text-gray-500 font-light text-lg md:text-2xl flex items-end gap-0">Class not started yet<Dot className="animate-bounce relative top-2 duration-100"/> <Dot className="animate-bounce relative top-2 right-3 duration-100 delay-150"/><Dot className="animate-bounce relative top-2 right-6 duration-100 delay-300"/></p>

         }
    </div>
  )
}

export default QRGenaretor