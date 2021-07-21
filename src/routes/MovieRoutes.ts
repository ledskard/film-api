import { Router } from "express";
import MovieController from "../controllers/MovieController";
import {validateCreateMovie} from "../schemas/MovieSchema";

const movieRouter = Router();
const movieController = new MovieController();

movieRouter.post("/", validateCreateMovie, movieController.create);
movieRouter.get("/", movieController.findAll);
movieRouter.get("/:id", movieController.findById);
movieRouter.put("/:id", movieController.update);
movieRouter.delete("/:id", movieController.delete);

export default movieRouter;
