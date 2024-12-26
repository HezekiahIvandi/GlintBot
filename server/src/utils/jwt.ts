import jwt, { JwtPayload } from "jsonwebtoken"

interface UserType{
    userId: string,
    username: string,
}

export interface PayloadType extends JwtPayload, UserType{
}

export interface VerifiedJwtType{
    payload: PayloadType | null,
    expired: boolean
}

const privateKey = process.env.JWT_PRIVATE_KEY;
const publicKey = process.env.JWT_PUBLIC_KEY;

if (!privateKey || !publicKey) {
    throw new Error("JWT keys are not defined in environment variables.");
}

//sign jwt
export const signJWT = async(userInfo: UserType, expiresIn: string | number): Promise<string> =>{
    try{
        const token = jwt.sign(userInfo, privateKey, {algorithm: "RS256", expiresIn});
        return token;
    }catch(e){
        console.error("Error signing JWT: ", e);
        throw new Error("Failed to sign jwt")
    }
  
}


//verify jwt
export const verifyJWT = async(token: string): Promise<VerifiedJwtType> => {
   try{
    const decodedPayload: PayloadType = jwt.verify(token, publicKey) as PayloadType
    const verifiedJWT: VerifiedJwtType = {payload: decodedPayload, expired: false};
    return verifiedJWT;
   }catch(e){
    if (e instanceof Error && (e.name === 'TokenExpiredError' || e.message.includes("jwt expired"))) {
        return { 
            payload: null, 
            expired: true 
        };
    }
    return { 
        payload: null, 
        expired: false 
    };
   }
}