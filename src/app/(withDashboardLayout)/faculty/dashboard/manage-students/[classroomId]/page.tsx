import { DataTable } from "@/components/dashboard/attendanceStats/data-table"
import { columns } from "@/components/dashboard/manageStudents/columns"
import {  getClassStudents } from "@/services/Classroom"

const ManageStudentPage = async({params}:{params:Promise<{classroomId:string}>}) => {
    const {classroomId} = await params
    const {data:students} = await getClassStudents(classroomId)
  return (
    <div className="px-4 py-12" >
        <h1 className="md:text-[4vw] font-extralight text-[7vw] text-center mb-8">{students[0]?.classroom.courseTitle}</h1>
        <DataTable columns={columns} data={students}/>
    </div>
  )
}

export default ManageStudentPage