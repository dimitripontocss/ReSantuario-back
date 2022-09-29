import { prisma } from "../databaseStrategy/database";
import { TIngredient } from "../interfaces/interfaces";

export async function getIngredientByName(name: string) {
  const result = await prisma.ingredient.findFirst({ where: { name } });
  return result;
}

export async function addIngredient(newIngredient: TIngredient) {
  const result = await prisma.ingredient.create({ data: newIngredient });
  return result;
}

export async function getIngredientsByRecipeId(recipeId: number) {
  return await prisma.ingredientRecipe.findMany({
    where: { recipeId },
    select: {
      amount: true,
      ingredient: {
        select: {
          name: true,
        },
      },
    },
  });
}
