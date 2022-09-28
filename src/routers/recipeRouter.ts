import { Router } from "express";

import { schemasMiddleware } from "../middlewares/schemasMiddleware";
import { jtwAuth } from "../middlewares/jwtAuthMiddleware";
import { addNewRecipe } from "../controllers/recipeController";

const recipeRouter = Router();
recipeRouter.use(jtwAuth);

recipeRouter.post("/recipe", addNewRecipe);

export default recipeRouter;
