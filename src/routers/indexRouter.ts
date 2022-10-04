import { Router } from "express";

import authRouter from "./authRouter";
import recipeRouter from "./recipeRouter";
import scoreRouter from "./scoreRouter";

const indexRouter = Router();

indexRouter.use([authRouter, recipeRouter, scoreRouter]);

export default indexRouter;
