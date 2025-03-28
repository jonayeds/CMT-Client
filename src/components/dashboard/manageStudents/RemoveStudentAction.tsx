import { Dialog, DialogClose, DialogContent, DialogDescription,  DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {  removeStudent } from "@/services/Classroom"
import { toast } from "sonner"

const RemoveStudentAction = ({studentId,classroomId}:{studentId:string, classroomId:string}) => {
    const handleRemoveStudent = async()=>{
        const result = await removeStudent({classroomId,studentId})
        if(!result?.success){
            toast.error(result?.message)
        }else{
            toast.success(result?.message)
        }
        
    }
  return (
    <div>
        <Dialog>
            <DialogTrigger>Remove</DialogTrigger>
            <DialogContent>
                <DialogTitle>Remove Student</DialogTitle>
                <DialogDescription/>
                <div>
                    <p>Are you sure?</p>
                    <div>
                        <DialogClose >Cancel</DialogClose>
                        <DialogClose onClick={handleRemoveStudent}  className="bg-red-500 text-white">Yes</DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default RemoveStudentAction