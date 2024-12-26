import { JwtPayload } from "jsonwebtoken";
import {Request} from "express";
import {Types} from 'mongoose'
interface UserType{
    userId: string,
    username: string
}

declare global{
    namespace Express{
        export interface Request{
            //user: string | null | JwtPayload;
            user: UserType | null
        }
    }
}