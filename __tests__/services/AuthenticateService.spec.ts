import * as sinon from "sinon";
import { ConnectionManager, Repository, Connection } from "typeorm";
import { UserRepository } from "../../src/repositories/UserRepository";
import { User } from "../../src/entities/User";
import { ICreateUserDTO } from "../../src/dtos/UserDTO";
import AuthenticateService from "../../src/middlewares/AuthenticateService";
import * as bcrypt from "bcrypt";

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
        sandbox.stub(bcrypt, "compare").callsFake(() => {
            return true;
        });
    });

    afterEach(() => {
        sandbox.restore();
    });
    test("Method authenticate must login a User", async () => {
        const authenticateService = new AuthenticateService();

        sandbox.stub(UserRepository.prototype, "findByEmail").resolves(returnDataMock);

        const response = await authenticateService.authenticate("luiz@email.com","senha123");

        expect(response).toBe(returnDataMock);
    });

});
