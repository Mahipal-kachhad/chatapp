import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";
import http from "http";
import { Server } from "socket.io";
import messageModel from "./models/messageModel";
dotenv.config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatapp-one-green.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await messageModel.create(data);
      io.emit("newMessage", newMessage);
    } catch (error) {
      console.error("error saving message", error);
    }
  });
});

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`server running on ${port}`);
  });
});
