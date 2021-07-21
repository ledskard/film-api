import * as sinon from "sinon";
import * as request from "supertest";
import * as jwt from "jsonwebtoken";
import app from "../../src/app";
import { ConnectionManager, Repository, Connection } from "typeorm";
import UserService from "../../src/services/UserService";
import { User } from "../../src/entities/User";
import { ICreateUserDTO } from "../../src/dtos/UserDTO";

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

    test("Method create must return status 422 (params error)", async (done) => {
        sandbox.stub(UserService.prototype, "create").resolves(returnDataMock);
        const result = await request(app).post("/users").set(header).send();
        expect(result.status).toBe(422);
        done();
    });

    test("Method create must return status 201", async (done) => {
        sandbox.stub(UserService.prototype, "create").resolves(returnDataMock);
        const result = await request(app).post("/users").set(header).send(inputDataMock);
        expect(result.status).toBe(201);
        done();
    });

    test("Method update must return status 200", async (done) => {
        sandbox.stub(UserService.prototype, "update").resolves(returnDataMock);

        const result = await request(app).put("/users/1").set(header).send(inputDataMock);
        expect(result.status).toBe(200);
        done();
    });

    test("Method findById must return status 200", async (done) => {
        sandbox.stub(UserService.prototype, "findById").resolves(returnDataMock);

        const result = await request(app).get("/users/1").set(header).send();
        expect(result.status).toBe(200);
        done();
    });

    test("Method findAll must return status 200", async (done) => {
        sandbox.stub(UserService.prototype, "findAll").resolves([returnDataMock]);

        const result = await request(app).get("/users").set(header).send();
        expect(result.status).toBe(200);
        done();
    });

    test("Method delete must return status 200", async (done) => {
        sandbox.stub(UserService.prototype, "delete").resolves(returnDataMock);

        const result = await request(app).delete("/users/1").set(header).send();
        expect(result.status).toBe(200);
        done();
    });
});
