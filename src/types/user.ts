import { JwtPayload } from "jwt-decode";

export interface IUser{
    _id:string;
    name:string;
    email:string;
    id:string;
    role:"student" | "faculty";
    password:string;
    profileImage:string;
    createdAt:string;
    updatedAt:string;
}

export interface IJwtDecodedUser extends JwtPayload{
    _id:string;
    email:string;
    role:"student" | "faculty";
}