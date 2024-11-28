import jwt, { JwtPayload } from "jsonwebtoken"

interface PayloadType{
    userId: string,
    username: string,
    iat?: string
}
interface verifiedJwtType{
    payload: JwtPayload | string | null,
    expired: boolean
}

const privateKey = process.env.JWT_PRIVATE_KEY;
const publicKey = process.env.JWT_PUBLIC_KEY;

if (!privateKey || !publicKey) {
    throw new Error("JWT keys are not defined in environment variables.");
}

//sign jwt
export const signJWT = async(payload: PayloadType, expiresIn: string | number): Promise<string> =>{
    try{
        const token = jwt.sign(payload, privateKey, {algorithm: "RS256", expiresIn});
        return token;
    }catch(e){
        console.error("Error signing JWT: ", e);
        throw new Error("Failed to sign jwt")
    }
  
}


//verify jwt
export const verifyJWT = async(token: string): Promise<verifiedJwtType> => {
   try{
    const decode = jwt.verify(token, publicKey)
    return {payload: decode, expired: false};

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