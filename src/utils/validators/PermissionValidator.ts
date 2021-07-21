import { AdminRoutes } from "../constants/RoutesConstants";
import { UserRoutes } from "../constants/RoutesConstants";
import TokenService from "../../middlewares/TokenService";
import {ErrorMessage, ErrorStatus} from "../constants/ErrorConstants";

export const validatePermission = async (method: string, route: string, token: string): Promise<boolean> => {
    const tokenService = new TokenService();
    const payload = await tokenService.decode(token);
    if(!payload.isAdmin){
        AdminRoutes.forEach((adminRoute) =>{
            if(route === adminRoute.route && method === adminRoute.method) throw {
                status: ErrorStatus.unauthorized,
                message: ErrorMessage.permission_denied,
            }
        })
    }
    else {
        UserRoutes.forEach((userRoute) => {
            if(route === userRoute.route && method === userRoute.method) throw {
                status: ErrorStatus.unauthorized,
                message: ErrorMessage.permission_denied,
            }
        })
    }
    return true;
};
