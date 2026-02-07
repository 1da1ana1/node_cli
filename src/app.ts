import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
import { AppDataSource } from './database/data-source';

AppDataSource.initialize();

const app = express();

app.use(express.json());
app.use(router);

export { app };