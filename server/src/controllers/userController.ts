import { Response } from "express";
import userModel from "../models/userModel";
import { ApiResponse, IUser, RegisterRequest } from "../types";

export const registerUser = async (
  req: RegisterRequest,
  res: Response<ApiResponse<IUser>>
) => {
  try {
    const { name, email, password } = req.body;
    const avatar = req.file?.path;
    
    const user = await userModel.create({ name, email, password, avatar });
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
