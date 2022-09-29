import { INewRecipeData } from "../interfaces/interfaces";
import * as recipeRepository from "../repositories/recipeRepository";

import * as categoryService from "./categoryService";
import * as ingredientService from "./ingredientService";
import * as nutritionalTableService from "./nutritionalTableService";

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
  const sendableRecipe = {
    title: newRecipe.title,
    categoryId,
    userId,
    pictureUrl: newRecipe.pictureUrl,
    instructions: newRecipe.instructions,
    difficulty: newRecipe.difficulty,
  };
  const addedRecipe = await recipeRepository.createNewRecipe(sendableRecipe);
  const addedNutritionalTable =
    await nutritionalTableService.addNutritionalTable(
      addedRecipe.id,
      ingredientsWInfo
    );

  relateIngredientsWithRecipe(ingredientsWInfo, addedRecipe.id);
  return { addedRecipe, addedNutritionalTable };
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
