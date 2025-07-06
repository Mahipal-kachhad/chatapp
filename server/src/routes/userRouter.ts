import { Router } from "express";
import { authenticateUser, registerUser } from "../controllers/userController";
import upload from "../middlewares/Upload";
import { validateRegister } from "../middlewares/validateRegister";
import { LoginSchema, RegisterSchema } from "../types/schema";
import { validateLogin } from "../middlewares/validateLogin";
const router = Router();

router.post(
  "/register",
  validateRegister(RegisterSchema),
  upload.single("avatar"),
  registerUser
);

router.post("/authenticate", validateLogin(LoginSchema), authenticateUser);

export default router;
