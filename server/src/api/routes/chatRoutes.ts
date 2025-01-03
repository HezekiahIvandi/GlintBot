import express, {Response, Request} from "express";
import { getCurrentUserController, uploadImageController } from "../controllers/chatController";
import deserializeUser from "../middleware/deserializeUser";

const router = express.Router();


router.get("/api/v1/upload", deserializeUser ,uploadImageController);


//Other stuff
router.get("/api/v1/me", deserializeUser, getCurrentUserController)
router.get("/get/currentUserToken", deserializeUser, async (req: Request, res: Response)=>{
    try{
        const user = req.user;
        if(!user) return;
        res.status(200).json({user})
    }catch(e){
        console.error(e);
    }
})
export default router;
