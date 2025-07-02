import { Router } from "express";
import { registerUser } from "../controllers/userController";
import upload from "../middlewares/Upload";
const router = Router();

router.post("/register", upload.single("avatar"), registerUser);

export default router;
