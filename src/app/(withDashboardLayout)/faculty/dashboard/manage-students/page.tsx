import ClassList from "@/components/dashboard/manageStudents/ClassList"
import { getMyClasses } from "@/services/Classroom"

export const dynamic = "force-dynamic"

const ManageStudentsPage = async() => {
  const {data:classes} = await getMyClasses()


  return (
    <div className="py-12 px-4">
      <h1 className="md:text-[4vw] font-extralight text-[7vw] text-center">
        Manage Students
      </h1>
      <ClassList classrooms={classes}/>
    </div>
  )
}



export default ManageStudentsPage