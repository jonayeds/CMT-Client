import ClassList from "@/components/dashboard/manageStudents/ClassList"
import { getMyClasses } from "@/services/Classroom"

const ManageStudentsPage = async() => {
  const {data:classes} = await getMyClasses()

  return (
    <div className="py-12 px-4">
      <h1 className="md:text-[4vw] font-extralight text-[7vw] text-center">
        Classrooms
      </h1>
      <ClassList classrooms={classes}/>
    </div>
  )
}

export default ManageStudentsPage