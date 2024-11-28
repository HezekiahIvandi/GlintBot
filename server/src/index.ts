
import express, { Express } from "express";
import * as dotenv from "dotenv";
import chatApi from "./api/routes/chatRoutes";
import authApi from "./api/routes/authRoutes"
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import deserializeUser from "./api/middleware/deserializeUser";

//configurations
const app: Express = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(deserializeUser)

//use apis
app.use(chatApi);
app.use(authApi);

//connect to db
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to mongodb!");
  } catch (e) {
    console.error(e);
  }
};

//run the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  connect();
  console.log(`Server running on port: ${port}`);
});
