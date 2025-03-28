"use client"
import { IAttendance } from "@/types/attendance"



const AttendanceStats = ({attendance}:{attendance:IAttendance}) => {
    const attendancePercentage = (attendance.present/ attendance.classes )*100
    const absentPercentage = (attendance.absent/ attendance.classes )*100
    const latePercentage = (attendance.late/ attendance.classes )*100
    
  return (
    <div className="px-2">
        
        <div className="w-full bg-gray-300 relative h-2 rounded-full overflow-hidden">
            <div className={`absolute bg-green-500 left-0 h-full `} style={{
                width:`${attendancePercentage}%`
            }}></div>
            <div className={`absolute bg-red-500  h-full `} style={{
                left:`${attendancePercentage}%`,
                width: `${absentPercentage}%`
            }}></div>
            <div className={`absolute bg-yellow-500 h-full `} style={{
                left:`${attendancePercentage + absentPercentage}%`,
                width: `${latePercentage}%`
            }}></div>
        </div>
        <p className="flex justify-center text-gray-400 text-xs mt-2">{!Number.isNaN(attendancePercentage) ? `${attendancePercentage.toFixed(2)}%`: '...'}</p>
    </div>
  )
}

export default AttendanceStats