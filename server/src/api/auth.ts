import express, {Request, Response} from "express"
import User from "../models/User";
const router = express.Router();

router.post("/api/v1/signup", async (req: Request, res: Response)=>{
    try{
        const {username, email, password} = req.body;
        const user = await User.create({username, email, password})
        const {password: _, ...userWithoutPassword} = user.toObject();
        res.status(201).json({message: "User created successfully!", userWithoutPassword})
    }catch(e){
        console.error("Error while signing-up: ",e);
        res.status(500).json({error: "Sign-up failed!"})
    }
})

router.post("/api/v1/signin", async(req: Request, res: Response)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {res.status(404).json({error: "User not found!"}); return;}

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {res.status(401).json({error: "Invalid email or password!"}); return}
        const {password: _, ...userWithoutPassword} = user.toObject()
        res.status(200).json({message: "User info is correct!", userWithoutPassword})

    }catch(e){
        console.error("Error while logging in!", e);
        res.status(500).json({error: "Internal server error!"})
    }
})

export default router