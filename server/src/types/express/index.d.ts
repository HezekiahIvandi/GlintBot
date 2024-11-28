import { JwtPayload } from "jsonwebtoken";
import {Request} from "express";

declare global{
    namespace Express{
        export interface Request{
            user: string | null | JwtPayload;
        }
    }
}