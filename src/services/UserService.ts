import { ICreateUserDTO } from "../dtos/UserDTO";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import {ErrorMessage, ErrorStatus} from "../utils/constants/ErrorConstants";
import {deletePassword} from "../utils/functions/DeletePassword";

export default class UserService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async create(data: ICreateUserDTO): Promise<User | undefined> {
        const verifyAlreadyExistUser = await this.userRepository.findByEmail(data.email);
        if(verifyAlreadyExistUser) throw { status: ErrorStatus.bad_request, message: ErrorMessage.user_already_registered }
        const user = await this.userRepository.create(data);
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.userRepository.findById(id);
        if (!user) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        deletePassword(user);
        return user;
    }

    public async findAll(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        users.forEach((user)=> {
            deletePassword(user)
        })
        return users;
    }

    public async update(id: string, data: ICreateUserDTO): Promise<User | undefined> {
        const user = await this.userRepository.findById(id);
        if (!user) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        const userToBeUpdated = Object.assign(user, data);
        let userUpdated = await this.userRepository.save(userToBeUpdated);
        deletePassword(userUpdated);
        return userUpdated;
    }

    public async delete(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw { status: ErrorStatus.not_found, message: ErrorMessage.id_not_found };
        user.active = false;
        const userDeleted = await this.userRepository.save(user);
        deletePassword(userDeleted);
        return userDeleted;
    }

}
