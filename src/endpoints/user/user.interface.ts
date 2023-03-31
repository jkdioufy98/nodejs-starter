import { Document } from "mongoose";

export default interface User extends Document{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    firstLog: boolean;
    status: boolean;
    phone: string;
    address: string;
    
    isValidPassword(password: string): boolean;
}

export enum ERole{
    SUPER_ADMIN = "SAD",
}