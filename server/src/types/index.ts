import { Request } from "express";

export interface IUser {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface RegisterRequest extends Request {
  body: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  };
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T | null;
  error?: string;
};

export interface IMessage {
  sender: string;
  receiver: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewMessageRequest {
  body: IMessage;
}

export interface GetMessagesRequest {
  query: {
    sender: string;
    receiver: string;
  };
}

export interface DeleteMessageRequest {
  body: {
    id: string;
  };
}
