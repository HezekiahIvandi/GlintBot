import mongoose from "mongoose";

interface IChats extends mongoose.Document{
    userId: string;
    history: Array<{
        role: "user" | "model";
        parts: string[];
        image?: string;
    }>;
}

const chatsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  
  history:[
    {
        role:{
            type: String,
            enum: ["user", "model"],
            required: true
        },
        parts:[
            {
                type: String,
                required: true
            }
        ],
        image:{
            type: String,
            required: false
        }
    }
  ]

},{timestamps: true}); 

const ChatModel = mongoose.model<IChats>('Chat', chatsSchema);

export default mongoose.models.Chat || ChatModel;