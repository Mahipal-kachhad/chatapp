import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod/v4";

export const validateLogin =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: result.error,
      });
    }
    req.body = result.data;
    next();
  };
