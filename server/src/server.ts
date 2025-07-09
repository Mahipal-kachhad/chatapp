import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";
import http from "http";
import { Server } from "socket.io";
import { log } from "console";
dotenv.config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user Disconnected");
  });

  socket.on("sendMessage", (message) => {
    io.emit("message : ", message);
  });
});

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
  });
});
