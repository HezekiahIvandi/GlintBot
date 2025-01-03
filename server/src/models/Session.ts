import mongoose, { Types } from "mongoose";

export const accessTokenAge = 1 //in minutes
export const refreshTokenAge = 6; //in minutes
interface SessionType extends Document{
    _id: Types.ObjectId,
    userId: string,
    isValid: boolean,
    createdAt: Date

}

const SessionSchema = new mongoose.Schema<SessionType>({
    userId: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        expires: refreshTokenAge * 60, // in minutes
        default: Date.now
    }


})


const Session = mongoose.model<SessionType>("Session", SessionSchema);

export default Session