import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      error: "unauthorized",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "MAka0055");
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({ success: false, error: "invalid token" });
  }
};
