import * as sinon from "sinon";
import * as request from "supertest";
import * as jwt from "jsonwebtoken";
import app from "../../src/app";
import { ConnectionManager, Repository, Connection } from "typeorm";
import UserService from "../../src/services/UserService";
import { User } from "../../src/entities/User";
import { ICreateUserDTO } from "../../src/dtos/UserDTO";
import UserMovieService from "../../src/services/UserMovieService";
import {UserMovie} from "../../src/entities/UserMovie";
import {Movie} from "../../src/entities/Movie";
import {InputUserMovieDTO} from "../../src/dtos/UserMovieDTO";
import AuthenticateService from "../../src/middlewares/AuthenticateService";
import TokenService from "../../src/middlewares/TokenService";

const returnDataMock: User = {
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

const inputDataMock: ICreateUserDTO = {
    name: "Luiz",
    email: "luiz@email.com",
    password: "senha123",
};


const header = {
    authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInN0YXlMb2dnZWQiOmZhbHNlLCJyZWZyZXNoVG9rZW4iOiJhZjQ1NjVjMi1hN2ZiLTRkYTItOTk1MS05NTUzYWVjNTkzY2EiLCJpYXQiOjE2MTA2NjMyNTksImV4cCI6MTYxMDc0OTY1OX0.pdAMCYZRXTp4mE7V6ZATLjRxhppdS4GMXRtGncbzthE",
    "Content-Type": "application/json",
};

describe("Testing #UserController", () => {
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

    test("Method authenticate must return status 200", async (done) => {
        sandbox.stub(AuthenticateService.prototype, "authenticate").resolves(returnDataMock);
        sandbox.stub(TokenService.prototype, "generateToken").resolves( "token");
        const result = await request(app).post("/users/login").set(header).send({
            email: "luiz@email.com",
            password: "senha123"
        });
        expect(result.status).toBe(200);
        done();
    });


});
