import { Schema, model } from "mongoose";
import User, { ERole } from "./user.interface";

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
        required: true
    },
    password: {
        type: String,
        required: true
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
        required: true,
        enum: [ERole.SUPER_ADMIN]
    }
},{timestamps: true})

export default model<User>('User', UserSchema);