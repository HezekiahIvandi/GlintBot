console.log("executing index.ts...");
import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import chatApi from "./api/chat-api";
import ImageKit from "imagekit";
import cors from "cors";
//configurations
const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
dotenv.config();

//use apis
app.use(chatApi);

//run the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
