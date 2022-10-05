import { Router } from "express";

import { jtwAuth } from "../middlewares/jwtAuthMiddleware";
import { schemasMiddleware } from "../middlewares/schemasMiddleware";
import { recipeSchema } from "../schemas/recipeSchema";
import {
  addNewRecipe,
  getSingleRecipe,
  getAllRecipes,
  getRecipesByName,
  getRandomId,
  deleteRecipe,
} from "../controllers/recipeController";

const recipeRouter = Router();

recipeRouter.get("/recipes", getAllRecipes);

recipeRouter.get("/recipe/:id", getSingleRecipe);

recipeRouter.get("/random", getRandomId);

recipeRouter.get("/search/recipes/:title", getRecipesByName);

recipeRouter.post(
  "/recipe",
  jtwAuth,
  schemasMiddleware(recipeSchema),
  addNewRecipe
);

recipeRouter.delete("/recipe/:recipeId", jtwAuth, deleteRecipe);

export default recipeRouter;
