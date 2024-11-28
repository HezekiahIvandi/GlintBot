import express, {Request, Response} from "express"
import {logOutController, signInController, signUpController} from "../controllers/authController"
import deserializeUser from "../middleware/deserializeUser";
import { JwtPayload } from "jsonwebtoken";
const router = express.Router();

router.post("/api/v1/signup", signUpController)
router.post("/api/v1/signin", signInController)
router.delete("/api/v1/logout", logOutController)

router.get("/get/currentUserToken", async (req: Request, res: Response)=>{
    try{
        const user = req.user;
        if(!user) return;
        res.status(200).json({user})
    }catch(e){
        console.error(e);
    }
})
export default router