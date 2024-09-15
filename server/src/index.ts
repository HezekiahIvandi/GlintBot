import express, { Express } from "express";
import * as dotenv from "dotenv";
import chatApi from "./api/chat-api";
//configurations
const app: Express = express();
app.use(express.json());
dotenv.config();

//use apis
app.use(chatApi);
//run the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
