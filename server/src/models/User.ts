import mongoose, {Document, Types} from "mongoose";
import bcrypt from "bcrypt"

interface UserType extends Document{
    _id: Types.ObjectId,
    username: string,
    email: string,
    password: string,
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserType>({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v: string) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        }
    },
    password:{
        type: String,
        required: [true, "Password is required!"],
        minlength: [6, "Password must be atleast 6 characters"]
    }
}, {
    timestamps: true
})

// Hash password before saving
UserSchema.pre('save', async function (next){
    if(!this.isModified("password")) return next();
    try{
        this.password = await bcrypt.hash(this.password, 10)
        next();
    }catch(e){
        next(e as Error)
    }
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean>{
    return bcrypt.compare(candidatePassword, this.password)
}
 
const User = mongoose.model<UserType>('User', UserSchema);
export default User;