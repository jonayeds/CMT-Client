"use client"
import { IAttendance } from "@/types/attendance"



const AttendanceStats = ({attendance}:{attendance:IAttendance}) => {
    const attendancePercentage = (attendance.present/ attendance.classes )*100
  return (
    <div>
        <p>{attendancePercentage}</p>
    </div>
  )
}

export default AttendanceStats