import 'reflect-metadata'
import express from 'express';
import { router } from './routes';
import { AppDataSource } from './database/data-source';

AppDataSource.initialize()
    .then(() => {
        const app = express();

        app.use(express.json());
        app.use(router);

        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((error) => console.log(error));