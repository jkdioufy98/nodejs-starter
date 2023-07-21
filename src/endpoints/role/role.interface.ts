import { Document } from "mongoose";

export default interface Role extends Document{
    code: string;
    libelle: string;
}

export enum ERole{
    SUPER_ADMIN = "SAD",
    ADMIN = "ADM"
}
