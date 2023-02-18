import { Router } from "express";
import { login } from "../Controllers/authController";
import { createUser } from "../Controllers/authController";

const AuthRouter = Router();

AuthRouter.route("/signup").post(createUser);
AuthRouter.route("/login").post(login);

export default AuthRouter;
