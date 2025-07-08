import { Router} from "express";
import { newMessage } from "../controllers/messageController";
const router = Router();

router.post("/add", newMessage);

export default router;
