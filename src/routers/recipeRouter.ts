import { Router } from "express";

import { jtwAuth } from "../middlewares/jwtAuthMiddleware";
import { schemasMiddleware } from "../middlewares/schemasMiddleware";
import { recipeSchema } from "../schemas/recipeSchema";
import { addNewRecipe, getAllRecipes } from "../controllers/recipeController";

const recipeRouter = Router();
recipeRouter.use(jtwAuth);

recipeRouter.post("/recipe", schemasMiddleware(recipeSchema), addNewRecipe);
recipeRouter.get("/recipes", getAllRecipes);

export default recipeRouter;
