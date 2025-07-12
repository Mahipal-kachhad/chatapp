import { Router } from "express";
import {
  addMessage,
  deleteMessage,
  getMessages,
} from "../controllers/messageController";

const router = Router();

router.post("/add", addMessage);
router.delete("/delete", deleteMessage);
router.post("/", getMessages);

export default router;
