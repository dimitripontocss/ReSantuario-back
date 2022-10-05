import { Recipe } from "@prisma/client";
import { INewRecipeData, IRecipeMinimalData } from "../interfaces/interfaces";
import * as recipeRepository from "../repositories/recipeRepository";

import * as categoryService from "./categoryService";
import * as ingredientService from "./ingredientService";
import * as nutritionalTableService from "./nutritionalTableService";
import * as scoreService from "./scoreService";
import * as userService from "./userService";

export async function getAllRecipes() {
  const recipes = await recipeRepository.findAllRecipes();
  return await formatResponse(recipes);
}

export async function getAllRecipesByUserId(userId: number) {
  const recipes = await recipeRepository.findAllRecipesByUserId(userId);
  return await formatResponse(recipes);
}

export async function getRandomId() {
  const allIds = await recipeRepository.findAllIds();
  const { id } = allIds[Math.floor(Math.random() * allIds.length)];
  return id;
}

export async function getRecipesByTitle(title: string) {
  const recipes = await recipeRepository.findRecipesByTitle(title);
  return await formatResponse(recipes);
}

export async function addNewRecipe(userId: number, newRecipe: INewRecipeData) {
  const alreadyExist = await recipeRepository.findRecipeByTitleAndUserId(
    userId,
    newRecipe.title
  );
  if (alreadyExist) {
    throw {
      name: "Already used",
      message: "Você já usou este titúlo. Crie novas receitas.",
    };
  }

  const categoryId = await categoryService.verifyCategory(newRecipe.category);
  const ingredientsWInfo = await ingredientService.verifyIngredients(
    newRecipe.ingredients
  );

  const addedRecipe = await recipeRepository.createNewRecipe({
    title: newRecipe.title,
    categoryId,
    userId,
    pictureUrl: newRecipe.pictureUrl,
    instructions: newRecipe.instructions,
    difficulty: newRecipe.difficulty,
    portions: newRecipe.portions,
  });
  const addedNutritionalTable =
    await nutritionalTableService.addNutritionalTable(
      addedRecipe.id,
      ingredientsWInfo
    );

  await relateIngredientsWithRecipe(ingredientsWInfo, addedRecipe.id);
  return { addedRecipe, addedNutritionalTable };
}

export async function getRecipeInfo(recipeId: number) {
  const possibleRecipe = await recipeRepository.findRecipeById(recipeId);
  if (!possibleRecipe) {
    throw {
      name: "not_found",
      message: "Receita não foi encontrada",
    };
  }
  const ingredients = await ingredientService.getAllIngredientsForRecipe(
    possibleRecipe.id
  );
  const score = await scoreService.getScoreByRecipeId(possibleRecipe.id);
  const user = await userService.findPossibleUserById(possibleRecipe.userId);
  const category = await categoryService.findCategoryById(
    possibleRecipe.categoryId
  );
  const nutritionalTable =
    await nutritionalTableService.getNutritionalTableByRecipeId(
      possibleRecipe.id
    );
  return {
    mainInfo: possibleRecipe,
    nutritionalTable,
    userInfo: user,
    category,
    ingredients,
    score,
  };
}

export async function getUserAverageRecipeScore(userId: number) {
  const recipes = await recipeRepository.findAllRecipesByUserId(userId);
  const average = await getAverage(recipes);
  return average;
}

export async function deleteRecipeAndRelations(
  userId: number,
  recipeId: number
) {
  const possibleRecipe = await recipeRepository.findRecipeById(recipeId);
  if (!possibleRecipe) {
    throw {
      name: "not_found",
      message: "Receita não foi encontrada",
    };
  }
  if (possibleRecipe.userId !== userId) {
    throw {
      name: "auth_error",
      message: "Essa receita não é desse usuário",
    };
  }

  await scoreService.deleteScores(possibleRecipe.id);
  await recipeRepository.deleteIngredientRecipeRelation(possibleRecipe.id);
  await nutritionalTableService.deleteNutritionalTable(possibleRecipe.id);
  await recipeRepository.deleteRecipe(possibleRecipe.id);
}

async function relateIngredientsWithRecipe(
  ingredients: any[],
  recipeId: number
) {
  for (const ingredient of ingredients) {
    await recipeRepository.relateIngredientWithRecipe(
      ingredient.amount,
      recipeId,
      ingredient.id
    );
  }
}

async function getAverage(recipes: IRecipeMinimalData[]) {
  let total = 0;
  let quantity = 0;
  for (const recipe of recipes) {
    const { average: recipeScore } = await scoreService.getScoreByRecipeId(
      recipe.id
    );
    total += +recipeScore;
    quantity++;
  }
  return total / quantity;
}

async function formatResponse(recipes: IRecipeMinimalData[]) {
  let formatedResponse = [];
  for (const recipe of recipes) {
    formatedResponse.push({
      id: recipe.id,
      title: recipe.title,
      pictureUrl: recipe.pictureUrl,
      difficulty: recipe.difficulty,
      categoryId: recipe.categories.id,
      categoryName: recipe.categories.name,
      score: await scoreService.getScoreByRecipeId(recipe.id),
    });
  }
  return formatedResponse;
}
