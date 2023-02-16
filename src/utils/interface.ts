import { Request } from "express";


export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INote{
    userId:IUser;
    Title:string;
    Description:string;
    Body:string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
}