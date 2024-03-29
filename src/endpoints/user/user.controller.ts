import { Router, Request, Response, NextFunction } from "express";
import validationMiddleware from "../../middlewares/validation.middleware";
import HttpException from "../../utils/exceptions/http.exception";
import Controller from "../../utils/interfaces/controller.interface";
import UserService from "./user.service";
import validateUser from "./user.validation";
import authMiddleware from "../../middlewares/authenticated.middleware";
import errorMiddleware from "../../middlewares/error.middleware";
import hasRoleMiddleware from "../../middlewares/hasrole.middleware";

class UserController implements Controller{
    public path = "/users";
    public router = Router();
    private userService = new UserService()

    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes(): void{
        this.router.post(
            `${this.path}`,
            authMiddleware,
            validationMiddleware(validateUser.register),
            this.create)
        this.router.post(
            `${this.path}/signin`,
            validationMiddleware(validateUser.login),
            this.login)
    }

    private create = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        const { firstName,lastName,email,password,phone, address, role } = request.body;
        
        try {
            const userid = await this.userService.create(firstName,lastName,email,password,phone,address, role);

            response.status(201).json({
                status: 201,
                payload: userid
            })

        } catch (error: any) {
            errorMiddleware(new HttpException(error.status, error.message), request, response, next)
        }

    }

    private login = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, password } = request.body;

            const payloadTokens = await this.userService.login(email, password);

            response.status(200).json({
                status: 200,
                payload: payloadTokens,
                message: "Utilisateur connecté avec succès."
            })
        } catch (error: any) {            
            errorMiddleware(new HttpException(error.status, error.message), request, response, next)
        }
    }

}

export default UserController;
