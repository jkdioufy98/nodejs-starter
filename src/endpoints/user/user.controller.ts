import { Router, Request, Response, NextFunction } from "express";
import validationMiddleware from "../../middlewares/validation.middleware";
import HttpException from "../../utils/exceptions/http.exception";
import Controller from "../../utils/interfaces/controller.interface";
import validate from './user.validation'

class UserController implements Controller{
    public path = "users";
    public router = Router();

    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes(): void{
        this.router.post(
            `${this.path}/`,
            validationMiddleware(validate.create)),
            this.create
    }

    private create = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        try {
            // const { firstName,lastName,email,password, firstLog, status, phone, address } = request.body;

            // response.status(201).json({
            //     status: 201,
            // })

        } catch (error) {
            
        }

    }
}