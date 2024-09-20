console.log("executing chat-api.ts ...");
import express, { Request, Response } from "express";
import ImageKit from "imagekit";
import * as dotenv from "dotenv";
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
  res.send("HELLO WORLD");
});

export default router;
