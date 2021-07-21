import * as jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import {User} from "../entities/User";
import TOKEN from "../utils/constants/TokenConstants";

export default class TokenService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async generateToken(user: User): Promise<string> {
        let token;
        if(user.isAdmin){
             token = jwt.sign({ id: user.id, isAdmin: true }, TOKEN.SECRET_TOKEN, {
                 expiresIn: TOKEN.EXPIRE_TOKEN_TIME,
            });
        } else {
            token = jwt.sign({ id: user.id }, TOKEN.SECRET_TOKEN, {
                expiresIn: TOKEN.EXPIRE_TOKEN_TIME,
            });
        }
        return token;
    }


    public async decode(token: string): Promise<any> {
        const payload = await jwt.decode(token);
        return payload;
    }
}
