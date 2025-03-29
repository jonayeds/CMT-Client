"use client"
import {ColumnDef} from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  IChatStudent } from "@/types/chat"
import moment from "moment"
import { TbCancel } from "react-icons/tb";
import { cancelChatrequest } from "@/services/Chat/intex"
import { toast } from "sonner"

export const studentRequestColumns:ColumnDef<Partial<IChatStudent>>[] = [
    {
        accessorKey:"course",
        header:()=><p key={"_id"} className="text-left">Course</p>,
        cell:({row})=><p className="text-left">{row.original.classroom?.courseTitle}</p>
    },
    {
        accessorKey:"faculty",
        header:"Faculty",
        cell:({row})=><div className="flex items-center gap-2">
            <Avatar>
                <AvatarImage src={row.original.faculty?.profileImage} />
                <AvatarFallback>{row.original.faculty?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p>{row?.original?.faculty?.name}</p>
        </div>
    },
    {
        accessorKey:"couseCode",
        header:()=><p className="text-center">Course Code</p>,
        cell:({row})=><p className="text-center">{row.original.classroom?.courseCode}</p>
    },
    {
        accessorKey:"status",
        header:()=><p className="text-center">Status</p>,
        cell:({row})=><p className={`w-max px-3 py-1 rounded-sm mx-auto ${row.original.status === "accepted" ? 'bg-green-200': row.original.status ==="rejected"? 'bg-red-200':'bg-yellow-200' }`}>{row.original.status}</p>
    },
    {
        accessorKey:"action",
        header:()=><p className="text-center">Action/Schedule</p>,
        cell:({row})=>{
            const handleCancelRequest = async()=>{
                const result = await cancelChatrequest(row.original._id as string)
                if(result?.success){
                    toast.success(result?.message)
                }else{
                    toast.error(result?.message)
                }
            }
            
            
            const schedule = moment(row.original.schedule).fromNow()
            if(row.original?.status === 'pending'){
                
                return (<div className="flex justify-center">
                <button onClick={handleCancelRequest} className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-red-600"><TbCancel/></button>
            </div>)
            }
            if(row.original.status === "rejected"){

                return (<div>
                <p className="text-center">...</p>
        </div>)
            }
            return (<div>
                <p className="text-center">{schedule}</p>
        </div>)

        }
    },
]
