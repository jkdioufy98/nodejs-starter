import { Schema, model } from "mongoose";
import User, { ERole } from "./user.interface";
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
    },
    firstLog: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ERole.SUPER_ADMIN],
        default: ERole.SUPER_ADMIN,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},{timestamps: true});


UserSchema.pre<User>('save', async function(next) {

    if(!this.isModified())
        return next();

    const hash = await bcrypt.hash(this.password,10);

    this.password = hash;

    next()
    
})

UserSchema.methods.isValidPassword = async function(password: string): Promise<Error | boolean>{
    return await bcrypt.compare(password, this.password)
}


export default model<User>('User', UserSchema);