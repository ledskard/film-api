import { Router } from "express";
import userRouter from "./userRoutes";
import movieRouter from "./MovieRoutes";
import userMovieRouter from "./UserMovieRoutes";
import auth from "../middlewares/Auth";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/users/movies", auth, userMovieRouter);
routes.use("/movies", auth, movieRouter);

export default routes;
