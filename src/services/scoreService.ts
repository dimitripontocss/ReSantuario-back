import * as scoreRepository from "../repositories/scoresRepository";

export async function getScoreByRecipeId(recipeId: number) {
  const result = await scoreRepository.getScoreByRecipeId(recipeId);
  return getAverage(result);
}

function getAverage(scores: any) {
  let totalAmount = 0;
  let quantity = 0;
  for (const score of scores) {
    totalAmount += score.score;
    quantity++;
  }
  return totalAmount / quantity;
}
