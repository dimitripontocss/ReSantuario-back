import { INewRecipeData } from "../interfaces/interfaces";
import * as recipeRepository from "../repositories/recipeRepository";

import * as categoryService from "./categoryService";
import * as ingredientService from "./ingredientService";
import * as nutritionalTableService from "./nutritionalTableService";
import * as scoreService from "./scoreService";
import * as userService from "./userService";

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
  return { mainInfo: possibleRecipe, userInfo: user, ingredients, score };
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
