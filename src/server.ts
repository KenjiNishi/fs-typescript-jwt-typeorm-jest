import 'reflect-metadata';
import express from 'express';

import connectionDB from './database';
import routes from './routes';

connectionDB().then(() => console.log("Database connection was successful", ));
const app = express();
const serverURL = process.env.SERVER_URL || "http://localhost";
const serverPort = process.env.PORT || 8080;

app.use(express.json());
app.use(routes);

app.listen(serverPort, ()=> console.log(
    `The server is running! ${serverURL}:${serverPort}/`
))