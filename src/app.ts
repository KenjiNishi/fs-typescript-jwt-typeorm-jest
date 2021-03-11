import 'reflect-metadata';
import express from 'express';

import connectionDB from './database';
import routes from './routes';

connectionDB().then(() => console.log("Database connection was successful", ));
const app = express();

app.use(express.json());
app.use(routes);

export {app};