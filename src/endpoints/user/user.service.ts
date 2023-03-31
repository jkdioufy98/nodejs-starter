import UserModel from "./user.model";
import User from "./user.interface";

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
}

export default UserService