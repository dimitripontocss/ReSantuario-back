import { Router } from "express";

import authRouter from "./authRouter";

const indexRouter = Router();

indexRouter.use([authRouter]);

export default indexRouter;
