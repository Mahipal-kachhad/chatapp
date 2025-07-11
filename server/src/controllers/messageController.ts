import { Response } from "express";
import {
  ApiResponse,
  DeleteMessageRequest,
  GetMessagesRequest,
  IMessage,
  NewMessageRequest,
} from "../types";
import messageModel from "../models/messageModel";

export const addMessage = async (
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

export const getMessages = async (
  req: GetMessagesRequest,
  res: Response<ApiResponse<IMessage[]>>
) => {
  try {
    const { sender, receiver } = req.body;
    if (!sender || !receiver) {
      res.status(500).json({
        success: false,
        error: "invalid request",
      });
    } else {
      const messages = await messageModel
        .find({
          $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
          ],
        })
        .sort({ createdAt: 1 });
      res.status(200).json({
        success: true,
        data: messages,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteMessage = async (
  req: DeleteMessageRequest,
  res: Response<ApiResponse<IMessage>>
) => {
  try {
    const { id } = req.body;
    const message = await messageModel.findByIdAndDelete(id);
    res.status(200).json({
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
