import User from "../../models/User";
import Session, { accessTokenAge, refreshTokenAge } from "../../models/Session";
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

        //create session
        const session = await Session.create({userId: _id});
        const sessionId = session._id.toString();

        //userInfo as payload
        const userInfo = {userId: _id.toString(), username, sessionId}

    
        const accessToken = await signJWT(userInfo, `${accessTokenAge}m`);
        const refreshToken = await signJWT({sessionId}, `${refreshTokenAge}m`);
        
        //store access & refresh token in http-only cookie

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true, 
        })

        res.cookie("refreshToken", refreshToken, {
            maxAge: refreshTokenAge * 60 * 1000,
            httpOnly: true,
            secure: true,
            path: "/api/v1/refresh"
        })

        res.status(200).json({message: "Sign-in Successful!"})

    }catch(e){
        console.error("Error while logging in!", e);
        res.status(500).json({error: "Internal server error!"})
    }
}

//Log-out
export const logOutController = async(req: Request, res: Response)=>{
    try{
        res.clearCookie('accessToken');
        res.status(200).json({message: "Log out successful"})
    }catch(e){
        console.error("Error while logging out: ", e);
        res.status(500).json({error: "Error while logging out."})
    }
}



//create session
export const refreshAccessTokenController = async(req: Request, res: Response)=> {
    try{
       const {refreshToken} = req.cookies;
       if(!refreshToken){
           res.clearCookie("accessToken")
           res.clearCookie("refreshToken")
           return res.status(401).json({error: "No refresh token"});
       }
       const decoded = await verifyJWT(refreshToken);
       const session = await Session.findById(decoded.payload?.sessionId);
   
       //refresh token is invalid or expired
       if(!session || !session.isValid){
           res.clearCookie("accessToken")
           res.clearCookie("refreshToken")
           return res.status(401).json({error: "Refresh token is expired or invalidated"});
       }
   
       const user = await User.findById(session.userId);
       if(!user) return res.status(404).json({error: "User is not found"})
   
       //userInfo as payload
       const userInfo = {userId: user?._id.toString(), username: user.username, sessionId: session._id}
   
       //Generate and store new accessToken into cookie
       const newAccessToken = await signJWT(userInfo, `${accessTokenAge}m`);
       res.cookie("accessToken", newAccessToken,{
           httpOnly: true,
           secure: true, 
       })
   
       
       res.status(200).json({message: "Access token refresh successful!"})
    }
    catch(e){
       console.error("Error while refreshing access token: ", e);
       res.status(500).json({error: "Something went wrong!"})
    }
}

