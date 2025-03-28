import { getMyAttendances } from "@/services/Attendance"
import { DataTable } from "../../../../../components/dashboard/attendanceStats/data-table"
import { columns } from "../../../../../components/dashboard/attendanceStats/columns"
import { IAttendance } from "@/types/attendance"

const AttendanceDashboardPage = async() => {
  const {data:classrooms} = await getMyAttendances()
  const tableData = classrooms?.map((classroom:IAttendance) => ({
    course:classroom.classroom.courseTitle,
    classes:classroom.classes,
    present:classroom.present,
    absent:classroom.absent,
    late:classroom.late,
    status: classroom
  }))
  return (
    <div className="py-12 px-4">
       <h1 className="md:text-[3vw] font-extralight text-[6vw] text-center">
        Attendance Statistics
      </h1>
      <DataTable columns={columns} data={tableData}/>
    </div>
  )
}



export default AttendanceDashboardPage