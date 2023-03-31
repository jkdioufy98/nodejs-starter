import { Router, Request, Response, NextFunction } from "express";
import validationMiddleware from "../../middlewares/validation.middleware";
import HttpException from "../../utils/exceptions/http.exception";
import Controller from "../../utils/interfaces/controller.interface";
import UserService from "./user.service";
import validate from './user.validation'

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
            validationMiddleware(validate.create),
            this.create)
    }

    private create = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { firstName,lastName,email,password, firstLog, status, phone, address } = request.body;

            const user = await this.userService.create(firstName,lastName,email,password,firstLog,status,phone,address);

            response.status(201).json({
                status: 201,
                payload: user
            })

        } catch (error) {
            next(new HttpException(500, "Error when creating the user !")) 
        }

    }
}

export default UserController