import { IClassroom } from "./classroom";
import { IUser } from "./user";

export interface IChat {
    student:IUser;
    status:"pending"| "accepted"| "rejected";
    classroom:IClassroom;
    createdAt:string;
    updatedAt:string;
    _id:string;
}

export interface IChatStudent{
    _id:string;
    status:"accepted" | "rejected" | "pending";
    classroom:IClassroom;
    createdAt:string;
    updatedAt:string;
    schedule:string;
    faculty:IUser
}