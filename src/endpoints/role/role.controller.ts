import { Router, Request, Response, NextFunction } from "express";
import validationMiddleware from "../../middlewares/validation.middleware";
import HttpException from "../../utils/exceptions/http.exception";
import Controller from "../../utils/interfaces/controller.interface";
import validateRole from "./role.validation";
import authMiddleware from "../../middlewares/authenticated.middleware";
import errorMiddleware from "../../middlewares/error.middleware";
import RoleService from "./role.service";

class RoleController implements Controller{
    public path = "/roles";
    public router = Router();
    private roleService = new RoleService();

    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void{
        this.router.post(
            `${this.path}`,
            validationMiddleware(validateRole.saveRole),
            this.create
        )
    }

    private create = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
        const { code, libelle } = request.body;

        try {

            const roleid = await this.roleService.create(code,libelle);
            response.status(201).json({
                status: 201,
                payload: roleid
            })

        } catch (error: any) {
            errorMiddleware(new HttpException(error.status, error.message), request, response, next)
        }

    }
}

export default RoleController;