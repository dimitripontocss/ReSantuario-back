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
