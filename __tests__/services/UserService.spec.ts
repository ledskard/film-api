import * as sinon from "sinon";
import { ConnectionManager, Repository, Connection, DeleteResult } from "typeorm";
import UserService from "../../src/services/UserService";
import { UserRepository } from "../../src/repositories/UserRepository";
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


describe("Testing #UserService", () => {
    const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sandbox.stub(ConnectionManager.prototype, "get").returns(({
            getRepository: sandbox.stub().returns(sinon.createStubInstance(Repository)),
        } as unknown) as Connection);
    });

    afterEach(() => {
        sandbox.restore();
    });
    test("Method Create must return a User", async () => {
        const userService = new UserService();

        sandbox.stub(UserRepository.prototype, "findByEmail").resolves();
        sandbox.stub(UserRepository.prototype, "create").resolves(returnDataMock);

        const response = await userService.create(inputDataMock);

        expect(response).toBe(returnDataMock);
    });

    test("Method findById must return a User", async () => {
        const userService = new UserService();

        sandbox.stub(UserRepository.prototype, "findById").resolves(returnDataMock);

        const response = await userService.findById("1");

        expect(response).toBe(returnDataMock);
    });
    test("Method findAll must return a array of User", async () => {
        const userService = new UserService();

        sandbox.stub(UserRepository.prototype, "findAll").resolves([returnDataMock]);
        const response = await userService.findAll();
        expect(response).toStrictEqual([returnDataMock]);
    });
    test("Method update must return a User", async () => {
        const userService = new UserService();

        sandbox.stub(UserRepository.prototype, "findById").resolves(returnDataMock);
        sandbox.stub(UserRepository.prototype, "save").resolves(returnDataMock);

        const response = await userService.update("1", returnDataMock);

        expect(response).toBe(returnDataMock);
    });

    test("Method delete must delete a User", async () => {
        const userService = new UserService();

        sandbox.stub(UserRepository.prototype, "findById").resolves(returnDataMock);
        sandbox.stub(UserRepository.prototype, "save").resolves(returnDataMock);

        const response = await userService.delete("1");
        expect(response).toBe(returnDataMock);
    });
});
