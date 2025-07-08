import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      error: "no token provided",
    });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "MAka0055");
      (req as any).user = decoded;
      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        error: "invalid token",
      });
    }
  }
};
