import { Router } from "express";

import authRouter from "./authRouter";
import recipeRouter from "./recipeRouter";

const indexRouter = Router();

indexRouter.use([authRouter, recipeRouter]);

export default indexRouter;
