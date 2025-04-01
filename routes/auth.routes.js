import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/users", getUsers);
authRouter.get("/users/:id", getUser);

export default authRouter;