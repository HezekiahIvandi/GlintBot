import { NextFunction, Request, Response } from "express"
import { verifyJWT } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const deserializeUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {accessToken} = req.cookies;
        if(!accessToken){
            console.log("Token is null!");
            return next();
        }
        console.log("Token found: ", accessToken)
        const decode = await verifyJWT(accessToken);
        console.log("Payload: ", decode.payload)
        req.user = decode.payload
        return next();
    }catch(e){
        console.error(e);
        console.log("Token doesnt exist in cookies")
        return next();
    }
}

export default deserializeUser