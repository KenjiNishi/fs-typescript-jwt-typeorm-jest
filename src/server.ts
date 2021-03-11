import { app } from "./app";

const serverURL = process.env.SERVER_URL || "http://localhost";
const serverPort = process.env.PORT || 8080;
app.listen(serverPort, ()=> console.log(
    `The server is running! ${serverURL}:${serverPort}/`
))