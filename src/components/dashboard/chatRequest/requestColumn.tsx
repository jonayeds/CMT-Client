
"use client"
import {ColumnDef} from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IChat } from "@/types/chat"
import ChatRequestHandler from "./ChatRequestHandler"

export const requestColumns:ColumnDef<Partial<IChat>>[] = [
    {
        accessorKey:"name",
        header:"Name",
        cell:({row})=><div className="flex items-center gap-2">
            <Avatar>
                <AvatarImage src={row.original.student?.profileImage} />
                <AvatarFallback>{row.original.student?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p>{row?.original?.student?.name}</p>
        </div>
    },
    {
        accessorKey:"id",
        header:()=><p className="text-center">ID</p>,
        cell:({row})=><p className="text-center">{row.original.student?.id}</p>
    },
    {
        accessorKey:"classroom",
        header:()=><p className="text-left">Classroom</p>,
        cell:({row})=><p className="text-left">{row.original.classroom?.courseTitle}</p>
    },
    {
        accessorKey:"couseCode",
        header:()=><p className="text-center">Course Code</p>,
        cell:({row})=><p className="text-center">{row.original.classroom?.courseCode}</p>
    },
    {
        accessorKey:"action",
        header:()=><p className="text-center">Action</p>,
        cell:({row})=><ChatRequestHandler chatId={row.original._id as string}/>
    },
]
