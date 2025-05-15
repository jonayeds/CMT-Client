'use client'
import { useUser } from "@/context/UserContext"
import { IAssignment } from "@/types/assignment"
import { IClassroom } from "@/types/classroom"
import moment from "moment"
import Link from "next/link"
import { MdAssignment } from "react-icons/md"

const AssignmentCard = ({assignment, classroom}:{assignment : IAssignment, classroom:IClassroom}) => {
    const {user:currentUser} = useUser()
    const createdAt = moment(assignment.createdAt)
  return (
    <Link href={`/my-classes/${classroom._id}/assignment/${assignment._id}`} className="py-4 px-6 border hover:shadow-md shadow-2xs duration-200 border-gray-300 rounded-xl flex items-center gap-4 cursor-pointer">
      <p className="text-green-700 text-2xl"><MdAssignment/></p>
      <div>
        <p>
          <span className="text-gray-600">
            {classroom.faculty._id === currentUser?._id ? "You" : classroom.faculty.name} uploaded
            new Assignment :
          </span>{" "}
          {assignment.title}
        </p>
        <p className="text-xs text-gray-600 mt-2">{createdAt.fromNow()}</p>
      </div>
    </Link>
  )
}

export default AssignmentCard