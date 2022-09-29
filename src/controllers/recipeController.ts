import { Request, Response } from "express";

import * as recipeService from "../services/recipeService";

export async function addNewRecipe(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const newRecipe = req.body;
  const registeredRecipe = await recipeService.addNewRecipe(userId, newRecipe);
  res.status(201).send(registeredRecipe);
}
export async function getSingleRecipe(req: Request, res: Response) {
  const recipeId = +req.params.id;
  const recipeInfo = await recipeService.getRecipeInfo(recipeId);
  res.status(200).send(recipeInfo);
}
