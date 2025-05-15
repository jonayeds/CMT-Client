import { Plus } from "lucide-react"
import Link from "next/link"

const CreateAssignment = ({classroomId}:{classroomId:string}) => {
  return (
    <Link href={`/my-classes/${classroomId}/create-assignment`} className="w-full border group flex items-center mt-8  justify-between p-8   rounded-lg border-gray-200 duration-500 shadow-xs hover:shadow-lg">
            <h1 className="text-lg font-semibold">Create Assignment</h1>
            <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500 hidden md:flex">Create a new assignment for your students</p>                        
            <Plus className="group-hover:rotate-180 duration-500"/>
            </div>
    </Link>
  )
}

export default CreateAssignment