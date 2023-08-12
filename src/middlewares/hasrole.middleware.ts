import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/exceptions/http.exception";
import { getTokenBearer } from "../utils/jwt/token";

const hasRoleMiddleware = ((error: HttpException, request: Request, response: Response, next: NextFunction) => {
    let token = getTokenBearer(request);
    console.log("+++++++ " + token);
    next()
})

export default hasRoleMiddleware;