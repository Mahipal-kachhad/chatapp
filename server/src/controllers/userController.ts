import { Response } from "express";
import userModel from "../models/userModel";
import {
  ApiResponse,
  AuthenticateRequest,
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
  res: Response<ApiResponse<IUser>>
) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email,
      password,
    });
    if (!user) {
      res.status(404).json({
        success: false,
        data: user,
      });
    } else {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

