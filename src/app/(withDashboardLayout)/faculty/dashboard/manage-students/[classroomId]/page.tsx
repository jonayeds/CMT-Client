import {  getClassStudents } from "@/services/Classroom"

const ManageStudentPage = async({params}:{params:Promise<{classroomId:string}>}) => {
    const {classroomId} = await params
    const {data:students} = await getClassStudents(classroomId)
  return (
    <div>
        
    </div>
  )
}

export default ManageStudentPage