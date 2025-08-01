import express from "express";
import path from "path";
import userRoutes from "./routes/userRouter";
import messageRoutes from "./routes/messageRouter";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "https://chatapp-one-green.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../uploads")));
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

export default app;
