/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import AttendanceStats from "@/components/dashboard/attendanceStats/AttendanceStats"
import { IAttendance } from "@/types/attendance"
import {ColumnDef} from "@tanstack/react-table"

export const columns:ColumnDef<Partial<IAttendance>>[] = [
    {
        accessorKey:"course",
        header:"Course"
    },
    {
        accessorKey:"classes",
        header:"Classes"
    },
    {
        accessorKey:"present",
        header:"Present"
    },
    {
        accessorKey:"absent",
        header:"Absent"
    },
    {
        accessorKey:"late",
        header:"Late"
    },
    {
        accessorKey:"status",
        header:"Status",
        cell:({row}:any)=><AttendanceStats attendance={row.getValue('status')}  />
    },
]
