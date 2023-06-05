import jwt from "jsonwebtoken";
import User from "../../endpoints/user/user.interface";
import Token from "../interfaces/token.interface";

export const generateJwtToken = (user: User): string =>{

    return jwt.sign({id: user._id, role:user.role},process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d'
    })
}

export const validateJwtToken = async (token: string): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (error, payload) => {
            if(error) return reject(error)

            resolve(payload as Token)
        })
    })
}

export default { generateJwtToken, validateJwtToken }