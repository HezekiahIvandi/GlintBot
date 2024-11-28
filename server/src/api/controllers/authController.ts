import User from "../../models/User";
import {Request, Response} from "express"
import { signJWT, verifyJWT } from "../../utils/jwt";
//Sign-up
export const signUpController = async (req: Request, res: Response)=>{
    try{
        const {username, email, password} = req.body;
        console.log(username, email, password);
        
        const user = await User.create({username, email, password})
        const {password: _, ...userWithoutPassword} = user.toObject();

       
        res.status(201).json({message: "User created successfully!", userWithoutPassword})
    }catch(e){
        console.error("Error while signing-up: ",e);
        res.status(500).json({error: "Sign-up failed!"})
    }
}

//Sign-in
export const signInController = async(req: Request, res: Response)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {res.status(404).json({error: "Invalid email or password!"}); return;}

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {res.status(401).json({error: "Invalid email or password!"}); return}

        const {_id, username} = user.toObject()
        const userInfo = {userId: _id.toString(), username}
        //create access token
        const accessToken = await signJWT(userInfo, '5m');

        //store access token in cookie
        res.cookie("accessToken",accessToken,{
            maxAge: 5 * 60 * 1000 , //5 minute
            httpOnly: true,
            secure: true, 
        })

        //verify access token
        const decoded = await verifyJWT(accessToken)
        res.status(200).json({message: "User info is correct!", payload: decoded.payload})

    }catch(e){
        console.error("Error while logging in!", e);
        res.status(500).json({error: "Internal server error!"})
    }
}

//Log-out
export const logOutController = async(req: Request, res: Response)=>{
    try{
        res.cookie("accessToken", "", {
            maxAge: 0,
            httpOnly: true,
            secure: true
        })

        res.status(200).json({message: "Log out successful"})
    }catch(e){
        console.error("Error while logging out: ", e);
        res.status(500).json({error: "Error while logging out."})
    }
}