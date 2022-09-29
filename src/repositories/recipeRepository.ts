import { prisma } from "../databaseStrategy/database";
import { TRecipe } from "../interfaces/interfaces";

export async function findRecipeByTitleAndUserId(
  userId: number,
  title: string
) {
  return await prisma.recipe.findUnique({
    where: {
      title_userId: {
        userId,
        title,
      },
    },
  });
}

export async function createNewRecipe(newRecipe: TRecipe) {
  return await prisma.recipe.create({
    data: newRecipe,
  });
}

export async function relateIngredientWithRecipe(
  amount: string,
  recipeId: number,
  ingredientId: number
) {
  await prisma.ingredientRecipe.create({
    data: {
      amount,
      recipeId,
      ingredientId,
    },
  });
}
