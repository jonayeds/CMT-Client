"use client"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { evaluateAssignment } from "@/services/assignment"
import { IAssignment } from "@/types/assignment"
import { ISubmission } from "@/types/submission"
import { useEffect, useState } from "react"
import { toast } from "sonner"


const SubmissionContainer = ({submissions, assignment }:{submissions:ISubmission[] | null, assignment:IAssignment}) => {
    const [marks, setMarks] = useState<number>(0)
    const [evaluatedList, setEvaluatedList ] = useState<{id:string, marks:number}[]>([])
    useEffect(()=>{
        if(!submissions) return
        const list = submissions?.filter((submission:ISubmission) => submission?.marks ).map((submission:ISubmission) => ({id:submission._id, marks:submission?.marks as number}))   
        setEvaluatedList(list)
    },[submissions])
    const handleMarkEvaluation = async(submissionId:string) => {
        const id = toast.loading("Evaluating...")  
        if(marks < 0 || marks > assignment.totalMarks){
            toast.error("Marks should be between 0 and total marks", {id})
            return
        }
        const result = await evaluateAssignment({marks}, submissionId)
        console.log(result)
        if(result?.success){    
            toast.success(result.message, {id})
            setEvaluatedList((prev) => [...prev, {id:submissionId, marks}])
            setMarks(0)
        }else{
            toast.error(result.message, {id})
        }    
    }
    if(!submissions) return <LoadingSpinner className="min-h-max mt-10" />
  return (  
    <div>
        <h1 className="text-center text-2xl font-semibold">Submissions</h1>
        <div className="flex flex-col gap-4 mt-4">
            {
            submissions.map((submission:ISubmission) => (
                <div key={submission._id} className="p-4 border border-gray-200 rounded-md">
                    
                <div  className="flex items-center justify-between ">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={submission.student.profileImage}/>
                        <AvatarFallback>{submission.student.name}</AvatarFallback>
                    </Avatar>
                <div>
                    <p className=" font-semibold md:text-lg text-sm">{submission.student.name}</p>
                    <p className=" text-gray-600 md:text-sm text-xs">{submission.isLate ? "Late Submission" : "On Time"}</p>
                </div>
                </div>
                <div className="flex flex-col items-end">    

                <a href={submission.submissionFile} target="_blank" rel="noopener noreferrer" className="text-green-500 text-sm md:text-lg">View Submission</a>
                <div className="md:flex hidden items-center mt-4  justify-center gap-2">
                     {
                        evaluatedList.find(l=> l.id === submission._id)? <p className="text-gray-500">{evaluatedList.find(l=> l.id === submission._id)?.marks} Marks</p> : <>
                        <Input onChange={(e)=>setMarks(Number(e.target.value))} type="number" className="w-[30vw]  border-gray-300 " />
                    <Button onClick={()=>handleMarkEvaluation(submission._id)} className="rounded-md  bg-green-600 text-white border-transparent">Evaluate</Button>
                        </>
                    }
                </div>
                </div>
                </div>
                <div className="md:hidden flex items-center mt-4  justify-center gap-2">
                    {
                        submission?.marks ? <p className="text-gray-500">{submission.marks} Marks</p> : <>
                        <Input onChange={(e)=>setMarks(Number(e.target.value))} type="number" className="w-[30vw]  border-gray-300 " />
                    <Button onClick={()=>handleMarkEvaluation(submission._id)} className="rounded-md  bg-green-600 text-white border-transparent">Evaluate</Button>
                        </>
                    }
                    
                </div>
                </div>
            ))
            }
        </div>      
    </div>
  )
}

export default SubmissionContainer