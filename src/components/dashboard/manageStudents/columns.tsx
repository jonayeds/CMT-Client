/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { IAttendance } from "@/types/attendance"
import {ColumnDef} from "@tanstack/react-table"
import RemoveStudentAction from "./RemoveStudentAction"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const columns:ColumnDef<Partial<IAttendance>>[] = [
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
        accessorKey:"present",
        header:()=><p className="text-center">Present</p>,
        cell:({row})=><p className="text-center">{row.original.present}</p>
    },
    {
        accessorKey:"absent",
        header:()=><p className="text-center">Absent</p>,
        cell:({row})=><p className="text-center">{row.original.absent}</p>
    },
    {
        accessorKey:"late",
        header:()=><p className="text-center">Late</p>,
        cell:({row})=><p className="text-center">{row.original.late}</p>
    },
    {
        accessorKey:"action",
        header:()=><p className="text-center">Action</p>,
        cell:({row}:any)=><RemoveStudentAction classroomId={String(row.original.classroom?._id)} studentId={String(row.original?.student?._id)} />
    },
]
