import 'reflect-metadata';
import express from 'express';
const cors = require('cors');

import connectionDB from './database';
import routes from './routes';

connectionDB().then(() => console.log("Database connection was successful", ));
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);


export {app};