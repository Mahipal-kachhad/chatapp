import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiResponse, IUser, RegisterRequest } from "../types";

export const registerUser = async (
  req: RegisterRequest,
  res: Response<ApiResponse<IUser>>
) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
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
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response<ApiResponse<IUser>>
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
      if (!isMatch) {
        res.status(401).json({
          success: false,
          error: "invalid credentials",
        });
        return;
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "MAka0055",
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600000,
      });

      res.status(200).json({
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllUser = async (
  req: Request,
  res: Response<ApiResponse<{}[]>>
) => {
  try {
    const usersData = await userModel.find({});
    const users = usersData.map((val) => {
      const { firstName, lastName, _id } = val;
      return { firstName, lastName, _id };
    });
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getMe = async (
  req: Request,
  res: Response<ApiResponse<IUser>>
) => {
  try {
    const userId = (req as any).user.userId;
    const user = await userModel.findById(userId, "firstName lastName _id");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: "invalid userId",
    });
  }
};

export const logOut = (req: Request, res: Response<ApiResponse<{}>>) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ success: true });
};
