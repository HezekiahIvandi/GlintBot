import { NextFunction, Request, Response } from "express"
import { verifyJWT, PayloadType, VerifiedJwtType } from "../../utils/jwt";

const deserializeUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {accessToken} = req.cookies;
        if(!accessToken){
            console.log("Token is null!");
            return next();
        }
        //verify token
        const decoded: VerifiedJwtType = await verifyJWT(accessToken);
        
        if(!decoded.payload){
            //if payload is null do something
            return;
        }; 
        console.log("Token is found, Payload: ", decoded.payload)
        const {userId, username} = decoded.payload;
        req.user = {userId, username}
        return next();

    }catch(e){
        console.error(e);
        console.log("Token doesnt exist in cookies")
        return next();
    }
}

export default deserializeUser