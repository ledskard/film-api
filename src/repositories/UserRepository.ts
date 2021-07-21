import { Repository, getRepository } from "typeorm";
import { User } from "../entities/User";
import { ICreateUserDTO } from "../dtos/UserDTO";

export class UserRepository {
    private readonly userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.userRepository
            .createQueryBuilder("u")
            .where("u.id = :id", {id})
            .andWhere("u.active = true")
            .getOne();
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepository
            .createQueryBuilder("u")
            .andWhere("u.email = :email", {email})
            .andWhere("u.active = true")
            .getOne();
        return user;
    }

    public async findAll(): Promise<User[]> {
        const users = await this.userRepository
            .createQueryBuilder("u")
            .andWhere("u.active = true")
            .getMany();
        return users;
    }

    public async save(data: User): Promise<User> {
        return await this.userRepository.save(data);
    }

}
