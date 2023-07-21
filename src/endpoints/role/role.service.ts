import HttpException from "../../utils/exceptions/http.exception";
import Role from "./role.interface";
import roleModel from "./role.model";

class RoleService{
    private role = roleModel;

    public async create(code: string, libelle: string): Promise<string>{
        
        try {
            
            const role = await this.role.create({
                code,
                libelle
            })

            return role._id;
        } catch (error: any) {
            throw new HttpException(error.status, error.message);

        }
    }
}

export default RoleService;