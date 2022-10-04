import { prisma } from "../databaseStrategy/database";
import { TScore } from "../interfaces/interfaces";

export async function getScoreByRecipeId(recipeId: number) {
  return await prisma.scores.findMany({
    where: { recipeId },
  });
}

export async function getScoreByRecipeId_UserId(
  userId: number,
  recipeId: number
) {
  return await prisma.scores.findUnique({
    where: {
      userId_recipeId: {
        userId,
        recipeId,
      },
    },
  });
}

export async function refreshScore(newScore: TScore) {
  return await prisma.scores.update({
    where: {
      userId_recipeId: {
        userId: newScore.userId,
        recipeId: newScore.recipeId,
      },
    },
    data: {
      score: newScore.score,
    },
  });
}

export async function createNewScore(scoreData: TScore) {
  return await prisma.scores.create({
    data: scoreData,
  });
}
