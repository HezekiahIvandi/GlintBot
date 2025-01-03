import { NextFunction, Request, Response } from "express"
import { verifyJWT,  VerifiedJwtType } from "../../utils/jwt";

const deserializeUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {accessToken} = req.cookies;
        console.log("")
        console.log("Middleware triggered: ");

        if(!accessToken){
            console.log("Access token null")
            return next()
        }

        //verify token
        const decoded: VerifiedJwtType = await verifyJWT(accessToken);
        
        if(decoded.expired){
            //if token is expired
            console.log("access token is expired: ",decoded )
            return res.status(401).json({
                error: "Access token expired",
                code: "TOKEN_EXPIRED"
            });
        };
        
        if(!decoded.payload){
            return next();
        }
        const {userId, username} = decoded.payload;
        req.user = {userId, username}
        return next();

    }catch(e){
        console.error(e);
        return next();
    }
}

export default deserializeUser