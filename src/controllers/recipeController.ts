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

export async function getAllRecipes(req: Request, res: Response) {
  const recipeInfo = await recipeService.getAllRecipes();
  res.status(200).send(recipeInfo);
}

export async function getRecipesByName(req: Request, res: Response) {
  const title = req.params.title;
  const recipeInfo = await recipeService.getRecipesByTitle(title);
  res.status(200).send(recipeInfo);
}

export async function getRandomId(req: Request, res: Response) {
  const id = await recipeService.getRandomId();
  res.status(200).send({ id });
}

export async function deleteRecipe(req: Request, res: Response) {
  const recipeId = +req.params.recipeId;
  const user = res.locals.user;
  await recipeService.deleteRecipeAndRelations(user.id, recipeId);
  res.sendStatus(200);
}
