import { Router } from "express";

import userRouter from "./userRouter";
import recipeRouter from "./recipeRouter";
import scoreRouter from "./scoreRouter";

const indexRouter = Router();

indexRouter.use([userRouter, recipeRouter, scoreRouter]);

export default indexRouter;
