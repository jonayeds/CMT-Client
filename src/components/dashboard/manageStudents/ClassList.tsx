import { IClassroom } from "@/types/classroom"
import Link from "next/link"

const ClassList = ({classrooms}:{classrooms:IClassroom[]}) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 mt-4 px-4">
        {
            classrooms.map(classroom =><Link className="border cursor-pointer hover:shadow-lg duration-200 rounded-lg px-4 py-6
             border-gray-300" key={classroom._id} href={`/faculty/dashboard/manage-students/${classroom._id}`}>
                <p className="text-green-700 text-lg">
                {classroom.courseTitle}
                </p>
                <p>{classroom.courseCode}</p>

            </Link>)
        }
    </div>
  )
}

export default ClassList