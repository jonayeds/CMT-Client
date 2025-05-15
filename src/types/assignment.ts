import { IClassroom } from "./classroom"

export interface IAssignment {
    _id:string
    title:string
    description?:string
    classroom:IClassroom
    deadline:string
    totalMarks:number
    createdAt:string
    updatedAt:string
}