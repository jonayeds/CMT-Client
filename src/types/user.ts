export interface IUser{
    _id:string;
    name:string;
    email:string;
    role:"student" | "faculty";
    password:string;
    profileImage:string;
    createdAt:string;
    updatedAt:string;
}