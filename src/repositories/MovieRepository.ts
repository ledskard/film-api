import { Repository, getRepository } from "typeorm";
import { Movie } from "../entities/Movie";
import {FindMovieFiltersDTO, ICreateMovieDTO} from "../dtos/MovieDTO";

export class MovieRepository {
    private readonly movieRepository: Repository<Movie>;

    constructor() {
        this.movieRepository = getRepository(Movie);
    }

    public async create(data: ICreateMovieDTO): Promise<Movie> {
        const movie = await this.movieRepository.create(data);
        await this.movieRepository.save(movie);

        return movie;
    }

    public async findById(id: string): Promise<Movie | undefined> {
        const movie = await this.movieRepository
            .createQueryBuilder("m")
            .where("m.id = :id", {id})
            .andWhere("m.active = true")
            .getOne();
        return movie;
    }

    public async findAll(filters: FindMovieFiltersDTO): Promise<Movie[]> {
        const movies = await this.movieRepository
            .createQueryBuilder("m")
            .andWhere("m.active = true");
        if(filters.name){
            movies.andWhere("m.name = :name", { name: filters.name })
        } else if(filters.name){
            movies.andWhere("m.director = :director", { director: filters.director })
        } else if(filters.genre){
            movies.andWhere("m.genre = :genre", { genre: filters.genre })
        }
        return movies.getMany();
    }

    public async save(data: Movie): Promise<Movie> {
        return await this.movieRepository.save(data);
    }

}
