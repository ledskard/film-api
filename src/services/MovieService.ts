import {FindMovieFiltersDTO, ICreateMovieDTO, IReturnMovieDetailsDTO} from "../dtos/MovieDTO";
import { Movie } from "../entities/Movie";
import { MovieRepository } from "../repositories/MovieRepository";
import {ErrorMessage, ErrorStatus} from "../utils/constants/ErrorConstants";
import {UserMovieRepository} from "../repositories/UserMovieRepository";

export default class MovieService {
    private readonly movieRepository: MovieRepository;
    private readonly userMovieRepository: UserMovieRepository;

    constructor() {
        this.movieRepository = new MovieRepository();
        this.userMovieRepository = new UserMovieRepository();
    }

    public async create(data: ICreateMovieDTO): Promise<Movie | undefined> {
        const movie = await this.movieRepository.create(data);
        return movie;
    }

    public async findById(id: string): Promise<IReturnMovieDetailsDTO | undefined> {
        const movie = await this.movieRepository.findById(id);
        const movieDetails = await this.userMovieRepository.findById(id);
        let note = 0;
        // for (i = 0; i < movieDetails.length; i++) {
        //   note += movieDetails[i].note;
        // }
        movieDetails.forEach((movieDetail)=>{
            note += movieDetail.note;
        })

        const noteAverage = note / movieDetails.length;

        const movieToReturn: IReturnMovieDetailsDTO = {
            id: movie.id,
            director: movie.director,
            genre: movie.genre,
            name: movie.name,
            noteAverage: noteAverage.toFixed(1),
        }

        if (!movie) throw { status: ErrorStatus.bad_request, message: ErrorMessage.id_not_found };

        return movieToReturn;
    }

    public async findAll(filters: FindMovieFiltersDTO): Promise<Movie[]> {
        const movies = await this.movieRepository.findAll(filters);

        return movies;
    }

    public async update(id: string, data: ICreateMovieDTO): Promise<Movie | undefined> {
        const movie = await this.movieRepository.findById(id);
        if (!movie) throw { status: ErrorStatus.bad_request, message: ErrorMessage.id_not_found };
        const movieUpdated = Object.assign(movie, data);
        await this.movieRepository.save(movieUpdated);
        return movieUpdated;
    }

    public async delete(id: string): Promise<Movie> {
        const movie = await this.movieRepository.findById(id);
        if (!movie) throw { status: ErrorStatus.bad_request, message: ErrorMessage.id_not_found };
        movie.active = false;
        const movieDeleted = await this.movieRepository.save(movie);
        return movieDeleted;
    }
}
