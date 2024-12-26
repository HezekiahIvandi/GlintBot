import express, {Request, Response} from "express"
import {logOutController, signInController, signUpController, getCurrentUserController} from "../controllers/authController"
const router = express.Router();

router.post("/api/v1/signup", signUpController)
router.post("/api/v1/signin", signInController)
router.delete("/api/v1/logout", logOutController)
router.get("/api/v1/me", getCurrentUserController)
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
