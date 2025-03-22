import { IUser } from "./user";

export interface IClassroom{
    _id:string,
    courseTitle:string,
    courseCode:string,
    classDays:string[],
    startTime:string,
    endTime:string,
    faculty:IUser
}