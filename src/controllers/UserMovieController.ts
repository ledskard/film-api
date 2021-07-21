import { Request, Response } from "express";
import { ProcessError } from "../utils/ProcessError";
import UserMovieService from "../services/UserMovieService";

export default class UserMovieController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const userMovieService = new UserMovieService();
            await userMovieService.create(req.body);

            return res.status(201).send({ success:true });
        } catch (err) {
            return ProcessError(res, err);
        }
    }
}
