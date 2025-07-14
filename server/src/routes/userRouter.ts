import { Router } from "express";
import {
  authenticateUser,
  getAllUser,
  getMe,
  logOut,
  registerUser,
} from "../controllers/userController";
import upload from "../middlewares/Upload";
import { validateRegister } from "../middlewares/validateRegister";
import { LoginSchema, RegisterSchema } from "../types/schema";
import { validateLogin } from "../middlewares/validateLogin";
import { requireAuth } from "../middlewares/authMiddleware";
const router = Router();

router.post(
  "/register",
  validateRegister(RegisterSchema),
  upload.single("avatar"),
  registerUser
);
router.post("/authenticate", validateLogin(LoginSchema), authenticateUser);
router.get("/", getAllUser);
router.get("/me", requireAuth, getMe);
router.post("/logout", logOut);

export default router;
