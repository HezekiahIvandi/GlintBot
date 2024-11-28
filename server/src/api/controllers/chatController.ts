import * as dotenv from "dotenv"
import express, {Express, Request, Response} from "express"
import ImageKit from "imagekit";
import ChatModel from "../../models/chats";
import userChatsHeader from "../../models/userChatsHeader";
dotenv.config();

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT as string,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
});

export const uploadImageController = (req: Request, res: Response) => {
    try{
      const result = imagekit.getAuthenticationParameters();
      res.send(result);
    }
    catch(e){
      console.error("Error while uploading image: ", e);
      res.status(500).json({error: "Image uploading is failed!"})
    }
  }