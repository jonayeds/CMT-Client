/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import { updateAttendance } from "@/services/Attendance";
import { IClassroom } from "@/types/classroom"
import { isTimeBeetween } from "@/utils/classroom";
import {  Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Dot } from "lucide-react";
import moment from "moment";
import { toast } from "sonner";
const MarkAttendance = ({classroom}:{classroom:IClassroom}) => {
  const today = moment().format("dddd")
  const isBetweenClassTime = isTimeBeetween(classroom.startTime,classroom.endTime)
  const isClassDay = classroom.classDays.includes(today)
  const startScanner = async()=>{
    document.getElementById("scannerBtn")?.classList.add("hidden")
    document.getElementById("scannerBtn")?.classList.remove("inline-flex")
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps:5,
      qrbox:{width:300, height:300},
      supportedScanTypes:[Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    },false)
    const success = async(result:string)=>{
      scanner.clear()
      if(result === classroom._id){
        const res = await updateAttendance(result)
        if(res.success){  
          toast.success("Attendance marked successfully") 
          }else{
            toast.error(`${res.message}`)
          }
      }
    }
    const error =(err:any)=>{
      console.log(err)
    }
    scanner.render(success, error)
  }
  // const mark = async()=>{
  //   const res = await updateAttendance(classroom._id)
  //   if(res.success){
  //     toast.success("Attendance marked successfully")
  //   }else{
  //     toast.error(`${res.message}`)
  //   }
  // }
  return (
    <div className="flex justify-center flex-col items-center"> 
    {
      (isBetweenClassTime && isClassDay) ? <><div className="w-[90vw] h-[90vw] duration-200 transition-all relative md:w-[50vw] overflow-hidden md:h-[40vw] lg:w-[30vw] lg:h-[30vw] bg-gray-200  rounded-2xl flex justify-center items-center flex-col" id="qr-reader"></div>
    <Button onClick={startScanner} id="scannerBtn" className="w-max mt-4 rounded-md">Scan QR</Button></> :  <p className="text-gray-500 mt-24 font-light text-lg md:text-2xl flex items-end gap-0">Class not started yet<Dot className="animate-bounce relative top-2 duration-100"/> <Dot className="animate-bounce relative top-2 right-3 duration-100 delay-150"/><Dot className="animate-bounce relative top-2 right-6 duration-100 delay-300"/></p>
    }
      
    </div>
  )
}

export default MarkAttendance