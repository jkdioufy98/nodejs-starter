import UserModel from "./user.model";
import User from "./user.interface";
import token from "../../utils/jwt/token";
import HttpException from "../../utils/exceptions/http.exception";

class UserService{
    private user = UserModel

    /**
     * Service de création d'un nouveau utilisateur
     */
    public async create(firstName: string,lastName: string,email: string,password: string,phone: string,address: string): Promise<User> {
        try {

            const existUser = await this.user.findOne({email: email});

            if(existUser)
                throw new Error("Un utilisateur avec cette adresse email existe déjà.");

            const user = await this.user.create({
                firstName,
                lastName,
                email,
                password,
                phone,
                address
            })

            return user._id;
        } catch (error) {
            throw new Error("Unable to create the user");
        }
    }

    /**
     * Service de connection d'un untilisateur
     */
    public async login(email: string, password: string): Promise<string | Error | void>{

        try {

            const user = await this.user.findOne({email});

            if(!user)
                throw new HttpException(404, "Utilisateur inexistant.")

            if(!(await user.isIdenticalPassword(password)))
                throw new HttpException(401, "Login/Password incorrect.")
            
            return token.generateJwtToken(user);
            
        } catch (error: any) {
                throw new HttpException(error.status, error.message);
        }
    }
}

export default UserService;