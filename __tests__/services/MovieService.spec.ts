import * as sinon from "sinon";
import { ConnectionManager, Repository, Connection, DeleteResult } from "typeorm";
import MovieService from "../../src/services/MovieService";
import { MovieRepository } from "../../src/repositories/MovieRepository";
import { Movie } from "../../src/entities/Movie";
import {ICreateMovieDTO, IReturnMovieDetailsDTO} from "../../src/dtos/MovieDTO";
import {UserMovieRepository} from "../../src/repositories/UserMovieRepository";
import {UserMovie} from "../../src/entities/UserMovie";
import {User} from "../../src/entities/User";

const returnDataMock: Movie = {
    id: "1",
    name: "Interstellar",
    director: "Christopher Nolan",
    genre:  "Aventura",
    active: true,
};

const inputDataMock: ICreateMovieDTO = {
    name: "Interstellar",
    director: "Christopher Nolan",
    genre:  "Aventura",
};

const returnMovieDetailsMock: IReturnMovieDetailsDTO = {
    id: "1",
    name: "Interstellar",
    director: "Christopher Nolan",
    genre:  "Aventura",
    noteAverage: "4.0"
}

const returnUserMovieMock: UserMovie = {
    id: "1",
    user: new User(),
    movie: returnDataMock,
    note: 4,
}


describe("Testing #MovieService", () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.stub(ConnectionManager.prototype, "get").returns(({
            getRepository: sandbox.stub().returns(sinon.createStubInstance(Repository)),
        } as unknown) as Connection);
    });

    afterEach(() => {
        sandbox.restore();
    });
    test("Method Create must return a Movie", async () => {
        const movieService = new MovieService();

        sandbox.stub(MovieRepository.prototype, "create").resolves(returnDataMock);

        const response = await movieService.create(inputDataMock);

        expect(response).toBe(returnDataMock);
    });

    test("Method findById must return a Movie", async () => {
        const movieService = new MovieService();

        sandbox.stub(MovieRepository.prototype, "findById").resolves(returnDataMock);
        sandbox.stub(UserMovieRepository.prototype, "findById").resolves([returnUserMovieMock]);

        const response = await movieService.findById("1");

        expect(response).toStrictEqual(returnMovieDetailsMock);
    });

    test("Method findAll must return a array of Movie", async () => {
        const movieService = new MovieService();

        sandbox.stub(MovieRepository.prototype, "findAll").resolves([returnDataMock]);
        const response = await movieService.findAll({});
        expect(response).toStrictEqual([returnDataMock]);
    });

    test("Method update must return a Movie", async () => {
        const movieService = new MovieService();

        sandbox.stub(MovieRepository.prototype, "findById").resolves(returnDataMock);
        sandbox.stub(MovieRepository.prototype, "save").resolves(returnDataMock);

        const response = await movieService.update("1", returnDataMock);

        expect(response).toBe(returnDataMock);
    });

    test("Method delete must delete a Movie", async () => {
        const movieService = new MovieService();

        sandbox.stub(MovieRepository.prototype, "findById").resolves(returnDataMock);
        sandbox.stub(MovieRepository.prototype, "save").resolves(returnDataMock);

        const response = await movieService.delete("1");
        expect(response).toBe(returnDataMock);
    });
});
