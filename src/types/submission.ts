import { IAssignment } from "./assignment";

export interface ISubmission{
    assignment:IAssignment;
    student:string;
    _id:string;
    isLate:boolean;
    submissionFile:string;
    createdAt:string;
    updatedAt:string;
    marks?:number;
}