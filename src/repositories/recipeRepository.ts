import { prisma } from "../databaseStrategy/database";
import { TRecipe } from "../interfaces/interfaces";

export async function findAllRecipes() {
  return await prisma.recipe.findMany({
    select: {
      id: true,
      pictureUrl: true,
      title: true,
      difficulty: true,
      categories: true,
    },
  });
}

export async function findAllRecipesByUserId(userId: number) {
  return await prisma.recipe.findMany({
    where: { userId },
    select: {
      id: true,
      pictureUrl: true,
      title: true,
      difficulty: true,
      categories: true,
      viewCount: true,
    },
  });
}

export async function findAllRecipesByCategoryId(categoryId: number) {
  return await prisma.recipe.findMany({
    where: { categoryId },
    select: {
      id: true,
      pictureUrl: true,
      title: true,
      difficulty: true,
      categories: true,
    },
  });
}

export async function findAllIds() {
  return await prisma.recipe.findMany({
    select: {
      id: true,
    },
  });
}

export async function findRecipesByTitle(title: string) {
  return await prisma.recipe.findMany({
    where: {
      title: { startsWith: title, mode: "insensitive" },
    },
    select: {
      id: true,
      pictureUrl: true,
      title: true,
      difficulty: true,
      categories: true,
    },
  });
}

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

export async function findRecipeById(id: number) {
  return await prisma.recipe.findFirst({
    where: {
      id,
    },
  });
}

export async function createNewRecipe(newRecipe: TRecipe) {
  return await prisma.recipe.create({
    data: newRecipe,
  });
}

export async function deleteRecipe(id: number) {
  return await prisma.recipe.delete({ where: { id } });
}

export async function deleteIngredientRecipeRelation(recipeId: number) {
  return await prisma.ingredientRecipe.deleteMany({
    where: {
      recipeId,
    },
  });
}

export async function addViewToRecipe(id: number, oldCount: number) {
  return await prisma.recipe.update({
    where: {
      id,
    },
    data: {
      viewCount: oldCount + 1,
    },
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
