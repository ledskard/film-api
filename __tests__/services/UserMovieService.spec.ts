import * as sinon from "sinon";
import { ConnectionManager, Repository, Connection } from "typeorm";
import UserMovieService from "../../src/services/UserMovieService";
import { UserMovieRepository } from "../../src/repositories/UserMovieRepository";
import { UserMovie } from "../../src/entities/UserMovie";
import {User} from "../../src/entities/User";
import {Movie} from "../../src/entities/Movie";
import {InputUserMovieDTO} from "../../src/dtos/UserMovieDTO";
import {UserRepository} from "../../src/repositories/UserRepository";
import {MovieRepository} from "../../src/repositories/MovieRepository";


const userDataMock: User = {
    id: "1",
    active: true,
    name: "Luiz",
    email: "luiz@email.com",
    isAdmin: false,
    password: "senha123",
    hashPassword: () => {
        "teste";
    },
    loadTempPassword() {
        this.tempPassword = this.password;
    },
};
const movieDataMock: Movie = {
    id: "1",
    name: "Interstellar",
    director: "Christopher Nolan",
    genre:  "Aventura",
    active: true,
};

const returnDataMock: UserMovie = {
    id: "1",
    user: new User(),
    movie: new Movie(),
    note: 4,
}
const inputDataMock: InputUserMovieDTO = {
    user: "1",
    movie: "1",
    note: 4,
}



describe("Testing #UserMovieService", () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.stub(ConnectionManager.prototype, "get").returns(({
            getRepository: sandbox.stub().returns(sinon.createStubInstance(Repository)),
        } as unknown) as Connection);
    });

    afterEach(() => {
        sandbox.restore();
    });
    test("Method Create must return a UserMovie", async () => {
        const userMovieService = new UserMovieService();

        sandbox.stub(UserRepository.prototype, "findById").resolves(userDataMock);
        sandbox.stub(MovieRepository.prototype, "findById").resolves(movieDataMock);
        sandbox.stub(UserMovieRepository.prototype, "create").resolves(returnDataMock);

        const response = await userMovieService.create(inputDataMock);

        expect(response).toBe(returnDataMock);
    });
});
