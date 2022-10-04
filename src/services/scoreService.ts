import { INewScoreData } from "../interfaces/interfaces";
import * as scoreRepository from "../repositories/scoresRepository";

export async function getScoreByRecipeId(recipeId: number) {
  const result = await scoreRepository.getScoreByRecipeId(recipeId);
  console.log(result);
  return { average: getAverage(result), scores: result };
}

export async function registerScore(userId: number, scoreData: INewScoreData) {
  const alreadyExist = await scoreRepository.getScoreByRecipeId_UserId(
    userId,
    scoreData.recipeId
  );
  if (alreadyExist) {
    return await scoreRepository.refreshScore({ ...scoreData, userId });
  }
  return await scoreRepository.createNewScore({ ...scoreData, userId });
}

function getAverage(scores: any) {
  let totalAmount = 0;
  let quantity = 0;
  for (const score of scores) {
    totalAmount += score.score;
    quantity++;
  }
  if (totalAmount === 0) return null;
  return (totalAmount / quantity).toFixed(1);
}
