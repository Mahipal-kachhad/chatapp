import mongoose from "mongoose";
import { IMessage } from "../types";

const messageSchema = new mongoose.Schema<IMessage>(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("message", messageSchema);
