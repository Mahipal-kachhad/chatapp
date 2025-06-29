import { Request, Response } from 'express';
import User from '../models/user';

interface ApiError extends Error {
  statusCode?: number;
  code?: number;  
  errors?: Record<string, any>;
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};