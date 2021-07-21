import { Repository, getRepository } from "typeorm";
import { UserMovie } from "../entities/UserMovie";
import { ICreateUserMovieDTO } from "../dtos/UserMovieDTO";

export class UserMovieRepository {
    private readonly userMovieRepository: Repository<UserMovie>;

    constructor() {
        this.userMovieRepository = getRepository(UserMovie);
    }

    public async create(data: ICreateUserMovieDTO): Promise<UserMovie> {
        const userMovie = await this.userMovieRepository.create(data);
        await this.userMovieRepository.save(userMovie);
        return userMovie;
    }

    public async findById(id: string): Promise<UserMovie[]> {
        const userMovie = await this.userMovieRepository
            .createQueryBuilder("m")
            .leftJoinAndSelect("m.user", "mu")
            .leftJoinAndSelect("m.movie", "mm")
            .andWhere("mm.id = :id", {id})
            .getMany();
        return userMovie;
    }

}
