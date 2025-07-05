import { Router } from "express";
import { registerUser } from "../controllers/userController";
import upload from "../middlewares/Upload";
import { validateRegister } from "../middlewares/validateRegister";
import { RegisterSchema } from "../types/RegisterSchema";
const router = Router();

router.post(
  "/register",
  validateRegister(RegisterSchema),
  upload.single("avatar"),
  registerUser
);

export default router;
