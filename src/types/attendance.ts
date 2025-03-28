import { IClassroom } from "./classroom";
import { IUser } from "./user";

export interface IAttendance{
    classroom:IClassroom ;
    student:IUser ;
    present:number;
    classes:number;
    absent:number;
    late:number;
    createdAt:Date;
    updatedAt:Date;
    _id:string;
}