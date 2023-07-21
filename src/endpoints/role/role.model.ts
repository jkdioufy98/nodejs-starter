import { Schema, model } from "mongoose";
import Role, { ERole } from "./role.interface";


const RoleSchema = new Schema({
    code: {
        type: String,
        enum: [ERole.SUPER_ADMIN, ERole.ADMIN],
        required: true
    },
    libelle: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true})

export default model<Role>('Role', RoleSchema);