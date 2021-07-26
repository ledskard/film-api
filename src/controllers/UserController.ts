import { Request, Response } from "express";
import { ProcessError } from "../utils/ProcessError";
import UserService from "../services/UserService";

export default class UserController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const userService = new UserService();
            await userService.create(req.body);

            return res.status(201).send({ success:true });
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const userService = new UserService();
            const user = await userService.findById(id);
            return res.status(200).json(user);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findAll(_req: Request, res: Response): Promise<Response> {
        try {
            const userService = new UserService();
            const users = await userService.findAll();
            return res.status(200).json(users);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const userService = new UserService();
            const user = await userService.update(id, req.body);
            return res.status(200).json(user);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const userService = new UserService();
            await userService.delete(id);
            return res.status(204);
        } catch (err) {
            return ProcessError(res, err);
        }
    }
}
