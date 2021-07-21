import * as sinon from "sinon";
import * as request from "supertest";
import * as jwt from "jsonwebtoken";
import app from "../../src/app";
import { ConnectionManager, Repository, Connection } from "typeorm";
import MovieService from "../../src/services/MovieService";
import { Movie } from "../../src/entities/Movie";
import {ICreateMovieDTO, IReturnMovieDetailsDTO} from "../../src/dtos/MovieDTO";
import TokenService from "../../src/middlewares/TokenService";

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

const header = {
    authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInN0YXlMb2dnZWQiOmZhbHNlLCJyZWZyZXNoVG9rZW4iOiJhZjQ1NjVjMi1hN2ZiLTRkYTItOTk1MS05NTUzYWVjNTkzY2EiLCJpYXQiOjE2MTA2NjMyNTksImV4cCI6MTYxMDc0OTY1OX0.pdAMCYZRXTp4mE7V6ZATLjRxhppdS4GMXRtGncbzthE",
    "Content-Type": "application/json",
};

describe("Testing #MovieController", () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.stub(ConnectionManager.prototype, "get").returns(({
            getRepository: sandbox.stub().returns(sinon.createStubInstance(Repository)),
        } as unknown) as Connection);
        sandbox.stub(jwt, "verify").callsFake(() => {
            return {
                success: "Token is valid",
                payload: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjI2MjI1MDU0LCJleHAiOjE2MjYzMTE0NTR9.e7_6VljkblR-ewHdhGWqsASbJmvNd2xXtK-EKOJJOHg" },
            };
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    test("Method create must return status 401", async (done) => {
        sandbox.stub(MovieService.prototype, "create").resolves(returnDataMock);
        const result = await request(app).post("/movies").set(header).send();
        expect(result.status).toBe(401);
        done();
    });

    test("Method create must return status 201", async (done) => {
        sandbox.stub(TokenService.prototype, "decode").resolves({ isAdmin: true });
        sandbox.stub(MovieService.prototype, "create").resolves(returnDataMock);
        const result = await request(app).post("/movies").set(header).send(inputDataMock);
        expect(result.status).toBe(201);
        done();
    });

    test("Method update must return status 200", async (done) => {
        sandbox.stub(MovieService.prototype, "update").resolves(returnDataMock);

        const result = await request(app).put("/movies/1").set(header).send(inputDataMock);
        expect(result.status).toBe(200);
        done();
    });

    test("Method findById must return status 200", async (done) => {
        sandbox.stub(MovieService.prototype, "findById").resolves(returnMovieDetailsMock);

        const result = await request(app).get("/movies/1").set(header).send();
        expect(result.status).toBe(200);
        done();
    });

    test("Method findAll must return status 200", async (done) => {
        sandbox.stub(MovieService.prototype, "findAll").resolves([returnDataMock]);

        const result = await request(app).get("/movies").set(header).send();
        expect(result.status).toBe(200);
        done();
    });

    test("Method delete must return status 200", async (done) => {
        sandbox.stub(MovieService.prototype, "delete").resolves(returnDataMock);

        const result = await request(app).delete("/movies/1").set(header).send();
        expect(result.status).toBe(200);
        done();
    });
});
