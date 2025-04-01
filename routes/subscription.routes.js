import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/subs', (req, res) => {
    res.send('SubsCription Page');
});

export default subscriptionRouter;