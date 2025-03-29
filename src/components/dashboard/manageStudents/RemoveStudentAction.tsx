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
    <div className="flex justify-center">
        <Dialog>
            <DialogTrigger className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer">Remove</DialogTrigger>
            <DialogContent className="bg-white  border-none">
                <DialogTitle>Remove Student</DialogTitle>
                <DialogDescription/>
                <div>
                    <p className="text-lg">Are you sure?</p>
                    <div className="flex justify-end gap-2">
                        <DialogClose className="px-4 py-2 text-gray-500 cursor-pointer">Cancel</DialogClose>
                        <DialogClose onClick={handleRemoveStudent}  className="bg-red-500 duration-200 hover:bg-red-700 text-white px-4 py-2 cursor-pointer rounded-lg">Yes</DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default RemoveStudentAction