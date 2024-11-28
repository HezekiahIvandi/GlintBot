import express from "express";
import { uploadImageController } from "../controllers/chatController";

const router = express.Router();


router.get("/api/v1/upload", uploadImageController);

// router.post("/api/v1/chat", (req: Request, res: Response)=>{
//   try{
//     const {message} = req.body;
//     console.log(message);

//     //
//     if(ChatModel){
//       console.log("ChatModel found");
//     }
//     if(userChatsHeader){
//       console.log("userChatsHeader foundssss");
//     }

//     res.status(200).json({message: "Operation successfuls"});
//   }catch(error){
//     console.log(error);
//     res.status(500).json({error: "Internal server error"});
//   }
// });

export default router;
