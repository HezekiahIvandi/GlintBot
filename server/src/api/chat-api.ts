import express, { Request, Response } from "express";
import ImageKit from "imagekit";
import * as dotenv from "dotenv";
import userChatsHeader from "../models/userChatsHeader";
import ChatModel from "../models/chats";

const router = express.Router();
dotenv.config();

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT as string,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
});

router.get("/api/v1/upload", (req: Request, res: Response) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

router.get("/", (req: Request, res: Response) => {
  res.send("HELLO ssWOsRLD");
});

router.post("/api/v1/chat", (req: Request, res: Response)=>{
  try{
    const {message} = req.body;
    console.log(message);

    //
    if(ChatModel){
      console.log("ChatModel found");
    }
    if(userChatsHeader){
      console.log("userChatsHeader foundssss");
    }

    res.status(200).json({message: "Operation successfuls"});
  }catch(error){
    console.log(error);
    res.status(500).json({error: "Internal server error"});
  }
});

export default router;
