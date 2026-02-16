import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
import { AppDataSource } from './database/data-source';
import { AppErrors } from './errors/AppErrors';
import { Request, Response, NextFunction } from "express";

AppDataSource.initialize();

const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppErrors) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({ message: "Internal server error" });
});

export { app };