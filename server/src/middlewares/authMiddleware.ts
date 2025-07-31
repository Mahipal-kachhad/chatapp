import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({
      success: false,
      error: "unauthorized",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "MAka0055");
    (req as any).user = decoded;
    next();
  } catch{
    res.status(401).json({ success: false, error: "invalid token" });
  }
};
