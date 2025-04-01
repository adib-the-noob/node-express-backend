import { Router } from "express";

const userRouter = Router();

userRouter.get('/user', (req, res) => {
    res.send({
        title: 'User Page',
    });
});

export default userRouter;