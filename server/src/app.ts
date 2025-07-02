import express from "express";
import path from "path";
import userRoutes from "./routes/userRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../uploads")));
app.use("/user", userRoutes);

export default app;