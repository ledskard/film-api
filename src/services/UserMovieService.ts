import {ICreateUserMovieDTO, InputUserMovieDTO} from "../dtos/UserMovieDTO";
import { UserMovie } from "../entities/UserMovie";
import { UserMovieRepository } from "../repositories/UserMovieRepository";
import {MovieRepository} from "../repositories/MovieRepository";
import {UserRepository} from "../repositories/UserRepository";
import {ErrorMessage, ErrorStatus} from "../utils/constants/ErrorConstants";

export default class UserMovieService {
    private readonly userMovieRepository: UserMovieRepository;
    private readonly userRepository: UserRepository;
    private readonly movieRepository: MovieRepository;

    constructor() {
        this.userMovieRepository = new UserMovieRepository();
        this.userRepository = new UserRepository();
        this.movieRepository = new MovieRepository();
    }

    public async create(data: InputUserMovieDTO): Promise<UserMovie | undefined> {
        const verifyExistUser = await this.userRepository.findById(data.user);
        if(!verifyExistUser) throw { status: ErrorStatus.bad_request, message: ErrorMessage.user_id_not_found};
        const verifyExistMovie = await this.movieRepository.findById(data.movie);
        if(!verifyExistMovie) throw { status: ErrorStatus.bad_request, message: ErrorMessage.movie_id_not_found};
        const voteToCreate = {
            user: verifyExistUser,
            movie: verifyExistMovie,
            note: data.note
        }
        const userMovie = await this.userMovieRepository.create(voteToCreate);
        return userMovie;
    }
}
