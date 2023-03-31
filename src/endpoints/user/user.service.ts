import UserModel from "./user.model";
import User from "./user.interface";
import token from "../../utils/jwt/token";

class UserService{
    private user = UserModel

    /**
     * Service de création d'un nouveau utilisateur
     */
    public async create(firstName: string,lastName: string,email: string,password: string,firstLog: boolean,status: boolean,phone: string,address: string): Promise<User> {
        try {
            const user = await this.user.create({
                firstName,
                lastName,
                email,
                password,
                firstLog,
                status,
                phone,
                address
            })

            return user
        } catch (error) {
            throw new Error("Unable to create the user");
        }
    }

    public async login(email: string, password: string): Promise<string | Error>{

        try {

            const user = await this.user.findOne({email});

            if(!user)
                throw new Error("Unable to find user with this mail in database.")

            if(await !user.isValidPassword(password))
                throw new Error("Wrong Login/Password");
                
            return token.generateJwtToken(user);
            
            
        } catch (error) {
            throw new Error("Unable to login the user");
            
        }
    }
}

export default UserService