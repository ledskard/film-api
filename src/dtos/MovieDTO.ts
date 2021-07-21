export interface ICreateMovieDTO {
    name: string;
    director: string;
    genre: string;
}
export interface FindMovieFiltersDTO {
    name?: string;
    director?: string;
    genre?: string;
}

export interface IReturnMovieDetailsDTO {
    id: string;
    name: string;
    director: string;
    genre: string;
    noteAverage: string;
}
