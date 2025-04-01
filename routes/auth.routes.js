import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { getUser, getUsers } from "../controllers/user.controller.js";
import { authorize } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/users", getUsers);
authRouter.get("/users/:id", authorize, getUser);

export default authRouter;