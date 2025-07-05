import { Request } from "express";

export interface IUser {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface RegisterRequest extends Request {
  body: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  };
  file?: Express.Multer.File;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export interface AuthenticateRequest extends Request{
  body:{
    email:string;
    password:string;
  }
}

export interface IAuth{
  email:string;
  password:string;
  isAuthenticated:boolean;
}
