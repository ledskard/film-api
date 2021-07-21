import { Router } from "express";
import UserController from "../controllers/UserController";
import {validateAuthenticateUser, validateCreateUser} from "../schemas/UserSchema";
import AuthenticateController from "../middlewares/AuthenticateController";
import auth from "../middlewares/Auth";

const userRouter = Router();
const userController = new UserController();
const authenticateController = new AuthenticateController();

userRouter.post("/", validateCreateUser, userController.create);
userRouter.get("/", auth, userController.findAll);
userRouter.get("/:id", auth, userController.findById);
userRouter.put("/:id", auth, userController.update);
userRouter.delete("/:id", auth, userController.delete);
userRouter.post("/login", validateAuthenticateUser, authenticateController.authenticate);


export default userRouter;
