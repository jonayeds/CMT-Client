import { IAssignment } from "./assignment";
import { IUser } from "./user";

export interface ISubmission{
    assignment:IAssignment;
    student: IUser;
    _id:string;
    isLate:boolean;
    submissionFile:string;
    createdAt:string;
    updatedAt:string;
    marks?:number;
}