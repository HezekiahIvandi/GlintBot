import mongoose from "mongoose";

interface IUserChatsHeader{
    userId: String;
    chatsHeader: Array<{
        _id: String;
        title: String;
        createdAt: Date;
    }>
}

const userChatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    chatsHeader: [
      {  
        _id: {
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now()
        }
    }
    ]
}, {timestamps: true});

const userChatsHeader = mongoose.model<IUserChatsHeader>('userChatsHeader', userChatSchema);
export default mongoose.models.userChatSchema || userChatsHeader;