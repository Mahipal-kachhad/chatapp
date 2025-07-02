import { Request } from "express";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface RegisterRequest extends Request {
  body: {
    name: string;
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
