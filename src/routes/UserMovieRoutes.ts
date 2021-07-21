import { Router } from "express";
import UserMovieController from "../controllers/UserMovieController";
import {validateCreateUserMovie} from "../schemas/UserMovieSchema";
import auth from "../middlewares/Auth";
const userMovieRouter = Router();
const userMovieController = new UserMovieController();

userMovieRouter.post("/vote", auth, validateCreateUserMovie, userMovieController.create);

export default userMovieRouter;
