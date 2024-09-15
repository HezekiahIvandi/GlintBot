import express, { Request, Response } from "express";
import ImageKit from "imagekit";
const router = express.Router();

// const imagekit = new ImageKit({
//   urlEndpoint: process.env.IMAGE_KIT_ENDPOINT as string,
//   publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
//   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
// });

// router.get("/upload", (req: Request, res: Response) => {
//   const result = imagekit.getAuthenticationParameters();
//   res.send(result);
// });

export default router;
