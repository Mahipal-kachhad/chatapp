import { Response } from "express";
import userModel from "../models/userModel";
import {
  ApiResponse,
  AuthenticateRequest,
  IAuth,
  IUser,
  RegisterRequest,
} from "../types";

export const registerUser = async (
  req: RegisterRequest,
  res: Response<ApiResponse<IUser>>
) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const avatar = req.file?.path;

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      avatar,
    });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const authenticateUser = async (
  req: AuthenticateRequest,
  res: Response<ApiResponse<IAuth>>
) => {
  try {
    const { email, password } = req.body;
    const authData = await userModel.findOne({ email: email });
    res.status(300).json({ success: true });
    console.log(authData);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
