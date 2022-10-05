import * as nutritionalTableRepository from "../repositories/nutritionalTableRepository";

export async function addNutritionalTable(recipeId: number, ingredients: any) {
  let kCal = 0;
  let protein = 0;
  let carbs = 0;
  let lipid = 0;
  ingredients.map((ingredient: any) => {
    kCal += ingredient.kCal;
    protein += ingredient.protein;
    carbs += ingredient.carbs;
    lipid += ingredient.lipids;
  });

  return await nutritionalTableRepository.createNutritionalTable({
    recipeId,
    kCal: String(kCal),
    protein: String(protein),
    carbs: String(carbs),
    lipid: String(lipid),
  });
}

export async function getNutritionalTableByRecipeId(recipeId: number) {
  return await nutritionalTableRepository.findNTableByRecipeId(recipeId);
}

export async function deleteNutritionalTable(recipeId: number) {
  await nutritionalTableRepository.deleteNutritionalTable(recipeId);
}
