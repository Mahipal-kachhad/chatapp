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
  data?: T | null;
  error?: string;
};

export interface AuthenticateRequest extends Request{
  body:{
    email:string;
    password:string;
  }
}

export interface IMessage {
  sender:string;
  receiver:string;
  timeStamp:string;
  message:string;
}

export interface NewMessageRequest extends Request {
  body: {
    sender: string;
    receiver: string;
    timeStamp: string;
    message: string;
  };
}
