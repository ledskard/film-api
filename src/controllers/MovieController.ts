import { Request, Response } from "express";
import { ProcessError } from "../utils/ProcessError";
import MovieService from "../services/MovieService";

export default class MovieController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const movieService = new MovieService();
            await movieService.create(req.body);

            return res.status(201).send({ created: true });
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const movieService = new MovieService();
            const movie = await movieService.findById(id);
            return res.status(200).json(movie);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const filters = req.query;
            const movieService = new MovieService();
            const movies = await movieService.findAll(filters);
            return res.status(200).json(movies);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const movieService = new MovieService();
            const movie = await movieService.update(id, req.body);
            return res.status(200).json(movie);
        } catch (err) {
            return ProcessError(res, err);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const movieService = new MovieService();
            await movieService.delete(id);
            return res.status(204);
        } catch (err) {
            return ProcessError(res, err);
        }
    }
}
