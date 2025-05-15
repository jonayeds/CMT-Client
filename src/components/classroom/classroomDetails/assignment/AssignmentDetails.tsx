'use client'

import { useUser } from "@/context/UserContext"
import { IAssignment } from "@/types/assignment"
import moment from "moment"
import { MdAssignment } from "react-icons/md"
import SubmitAssignment from "./SubmitAssignment"
import { useEffect, useState } from "react"
import { getAllAssignmentSubmissions, getMyAssignmentSubmission } from "@/services/assignment"
import { ISubmission } from "@/types/submission"
import SubmissionContainer from "./SubmissionContainer"


const AssignmentDetails = ({assignment}:{assignment:IAssignment}) => {
    const {user} = useUser()
    const createdAt = moment(assignment.createdAt).format('MMM Do YY')    
    const dueDate = moment(assignment.deadline).format('MMM Do YY')  
    const daysLeft = moment(assignment.deadline).fromNow() 
    const [mySubmission, setMySubmission] = useState<ISubmission | undefined | null>(undefined)
    const [assignmentSubmissions, setAssignmentSubmissions] = useState<ISubmission []>([])
    useEffect(()=>{
        const getSubmission = async () => {
            if(user?.role === "student"){
                const data = await getMyAssignmentSubmission(assignment._id)
                setMySubmission(data?.data) 
            }
            else if(user?.role === "faculty"){
                const {data:submission} = await getAllAssignmentSubmissions(assignment._id)
                setAssignmentSubmissions(submission)
            }
        }
        getSubmission()
    },[assignment._id, user?.role]) 
  return (
    <div className="px-[5vw]">
        <div className="flex items-center gap-4 mt-4 mb-2 md:text-[3vw] text-[7vw]">  
            <MdAssignment className=" text-green-600"/>
            <h1 className="text-center ">{assignment.title}</h1>
        </div>
        <div>
            <p className="text-sm text-gray-600">Uploaded at, {createdAt}</p>
            <div className="flex items-center justify-between gap-2 mt-2">
                <p>{assignment.totalMarks} Marks</p>
                <div className="flex flex-col items-end gap-2">
                <p >Due at,<span className="text-green-600"> {dueDate}</span></p>
                <p className="text-sm text-gray-600">{daysLeft}</p>  
                </div>
            </div>
        </div>
        <hr className="botder border-gray-200 w-full my-4 " />
        <div>
            {
                user?.role === "student" && <SubmitAssignment assignmentId={assignment._id} mySubmission={mySubmission}/>
            }
            {
                user?.role === "faculty" && <SubmissionContainer submissions={assignmentSubmissions} assignment={assignment} />
            }
        </div>
    </div>
  )
}

export default AssignmentDetails