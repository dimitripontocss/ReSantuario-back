import { prisma } from "../databaseStrategy/database";

export async function getScoreByRecipeId(recipeId: number) {
  return await prisma.scores.findMany({
    where: { recipeId },
  });
}
