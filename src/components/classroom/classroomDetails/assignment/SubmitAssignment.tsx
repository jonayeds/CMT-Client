'use client'
import FileInput from "@/components/shared/FileInput"
import LoadingSpinner from "@/components/shared/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { submitAssignment } from "@/services/assignment"
import { uploadContentToDropbox } from "@/services/Content/contentUpload"
import { ISubmission } from "@/types/submission"
import { useState } from "react"
import { toast } from "sonner"

const SubmitAssignment = ({mySubmission, assignmentId}:{mySubmission:ISubmission| null | undefined, assignmentId:string}) => {
  const [submissionFiles, setSubmissionFiles] = useState<File[]>([])  
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async()=>{
    setLoading(true)
    if(submissionFiles.length === 0) return
    if (submissionFiles[0].size > 10 * 1024 * 1024) { 
      setLoading(false)
      toast.error("File is too big!!");
      return;
    }
    const { fileUrls } = await uploadContentToDropbox(submissionFiles);
    const submission = {
      assignment : assignmentId,
      submissionFile : fileUrls[0]
    }
    const result = await submitAssignment(submission)
    if(result?.success){
      setSubmissionFiles([])
      setLoading(false)
      window.location.reload()
    }else{
      setLoading(false)
      toast.error(result?.message || 'Something went wrong')  
    }
  }
  return (
    <div className="border border-gray-200 w-max p-4 rounded-lg mx-auto">
      <div className="flex gap-4 justify-between min-w-[30vw] md:items-end items-center"> 
      <p className="md:text-2xl text-lg text-gray-500">Your Submission</p>
      <div className="md:text-sm text-xs text-gray-500">{mySubmission === null ? 'Not Submitted':<div>{mySubmission === undefined ? <LoadingSpinner className="min-h-max " loaderClassName="h-4 w-4"/> : 'Turned In'}</div> }</div>
      </div>
      


       <div className="mt-4">{mySubmission === null ? <div>
        {
          submissionFiles.length > 0 ? <div
          className="flex w-full   flex-col border-gray-200 border  px-8 py-4 rounded-xl relative "
          >
                <span className="hover:underline  truncate">{submissionFiles[0].name}</span>
                <span className="text-gray-600 opacity-80 truncate">
                  {submissionFiles[0].type === "application/pdf" ||submissionFiles[0].type === "image/jpeg"
                    ? submissionFiles[0]?.type.split("/")[submissionFiles[0].type.split("/").length - 1]
                    : submissionFiles[0]?.type.split(".")[submissionFiles[0].type.split(".").length - 1]}
                  {" "}File
                </span>
              </div> : <FileInput className="mx-auto mt-8 rounded-lg px-8" setFiles={setSubmissionFiles}/>
        }
        {
          submissionFiles.length > 0 && <div className="flex justify-center gap-2 mt-4"> 
          <Button className="rounded-md  " onClick={()=>setSubmissionFiles([])}>Clear Submission</Button>
          <Button className="rounded-md  border border-green-600 text-green-600" onClick={handleSubmit}>{loading ? <LoadingSpinner className="min-h-max " loaderClassName="w-4 h-4 text-green-600"/> : 'Turn in'}</Button>
          </div>
        }
          
      </div>:<div>{mySubmission === undefined ? <LoadingSpinner className="min-h-max " loaderClassName="h-4 w-4"/> : <div className=" border-gray-200 border mt-4  px-8 py-4 rounded-xl">
        <a href={mySubmission?.submissionFile} target="#" className="hover:underline">My Submission</a>
      </div> }</div> }</div>


    </div>
  )
}

export default SubmitAssignment