import UserModel from "./user.model";
import token from "../../utils/jwt/token";
import HttpException from "../../utils/exceptions/http.exception";
import GeneratedToken from "../../utils/class/GeneratedTokens";
import roleModel from "../role/role.model";
import { ObjectId } from "mongoose";


class UserService{
    private user = UserModel;
    private role = roleModel;

    /**
     * Service de création d'un nouveau utilisateur
     */
    public async create(firstName: string,lastName: string,email: string,password: string,phone: string,address: string, role: ObjectId): Promise<string> {
        try {

            const existUser = await this.user.findOne({email: email});

            if(existUser)
                throw new HttpException(409, "Un utilisateur avec cet adresse email existe déjà.")
            
            if(!(await this.role.findById(role)))
                throw new HttpException(404, "Role inexistant.")

            const user = await this.user.create({
                firstName,
                lastName,
                email,
                password,
                phone,
                address,
                role
            })

            return user._id;
            
        } catch (error: any) {
            throw new HttpException(error.status, error.message);
        }
    }

    /**
     * Service de connection d'un utilisateur
     */
    public async login(email: string, password: string): Promise<GeneratedToken>{

        try {

            const user = await this.user.findOne({email});

            if(!user)
                throw new HttpException(404, "Utilisateur inexistant.")

            if(!(await user.isIdenticalPassword(password)))
                throw new HttpException(401, "Login/Password incorrect.")
            
            const accessToken = token.generateJwtToken(user)
            const refreshToken = token.generateRefreshToken(user)
            
            return new GeneratedToken(accessToken,refreshToken);
            
        } catch (error: any) {
                throw new HttpException(error.status, error.message);
        }
    }
}

export default UserService;