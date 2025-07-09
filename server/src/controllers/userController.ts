import { Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
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
  res: Response<ApiResponse<{ user: IUser; token: string }>>
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      res.status(401).json({
        success: false,
        error: "invalid credentials",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password!);
      if (!isMatch)
        res.status(401).json({
          success: false,
          error: "invalid credentials",
        });

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "MAka0055",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        success: true,
        data: { user, token },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
