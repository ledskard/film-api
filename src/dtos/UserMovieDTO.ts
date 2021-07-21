import {User} from "../entities/User";
import {Movie} from "../entities/Movie";

export interface InputUserMovieDTO {
    user: string;
    movie: string;
    note: number;
}
export interface ICreateUserMovieDTO {
    user: User;
    movie: Movie;
    note: number;
}
