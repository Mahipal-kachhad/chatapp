import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.connectDatabase();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async connectDatabase(): Promise<void> {
    const { MONGO_URI } = process.env;
    
    if (!MONGO_URI) {
      throw new Error('MongoDB connection URI is missing in .env file');
    }

    try {
      await mongoose.connect(MONGO_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}

export default new App().app;
