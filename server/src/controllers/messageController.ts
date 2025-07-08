import { Response } from "express";
import { ApiResponse, IMessage, NewMessageRequest } from "../types";
import messageModel from "../models/messageModel";

export const newMessage = async (
  req: NewMessageRequest,
  res: Response<ApiResponse<IMessage>>
) => {
  try {
    const message = await messageModel.create(req.body);
    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
