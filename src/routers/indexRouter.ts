import { Router } from "express";

import userRouter from "./userRouter";
import recipeRouter from "./recipeRouter";
import scoreRouter from "./scoreRouter";
import categoryRouter from "./categoryRouter";

const indexRouter = Router();

indexRouter.use([userRouter, recipeRouter, scoreRouter, categoryRouter]);

export default indexRouter;
