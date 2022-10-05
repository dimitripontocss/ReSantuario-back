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
  console.log(recipeId);
  const recipeInfo = await recipeService.getRecipeInfo(recipeId);
  res.status(200).send(recipeInfo);
}

export async function getAllRecipes(req: Request, res: Response) {
  const recipeInfo = await recipeService.getAllRecipes();
  res.status(200).send(recipeInfo);
}

export async function getAllRecipesByUserId(req: Request, res: Response) {
  const userId = +req.params.userId;
  const recipeInfo = await recipeService.getAllRecipesByUserId(userId);
  res.status(200).send(recipeInfo);
}

export async function getRecipesByName(req: Request, res: Response) {
  const title = req.params.title;
  console.log(title);
  const recipeInfo = await recipeService.getRecipesByTitle(title);
  res.status(200).send(recipeInfo);
}

export async function getRandomId(req: Request, res: Response) {
  const id = await recipeService.getRandomId();
  res.status(200).send({ id });
}
