import axios from "axios";

import { IIngredient } from "../interfaces/interfaces";

import * as ingredientRepository from "../repositories/ingredientRepository";

export async function verifyIngredients(ingredients: IIngredient[]) {
  let ingredientsWInfo = [];
  for (const ingredient of ingredients) {
    const ingredientWInfo = await getIngredientInfo(ingredient);
    ingredientsWInfo.push(ingredientWInfo);
  }
  return ingredientsWInfo;
}

async function getIngredientInfo(ingredient: IIngredient) {
  const possibleIngredient = await ingredientRepository.getIngredientByName(
    ingredient.name.toLowerCase()
  );
  if (possibleIngredient) {
    return {
      id: possibleIngredient.id,
      name: possibleIngredient.name,
      kCal: Number(possibleIngredient.kCalPerG) * Number(ingredient.amount),
      protein:
        Number(possibleIngredient.proteinPerG) * Number(ingredient.amount),
      carbs: Number(possibleIngredient.carbsPerG) * Number(ingredient.amount),
      lipids: Number(possibleIngredient.lipidPerG) * Number(ingredient.amount),
      amount: ingredient.amount,
    };
  }

  //Vai virar função
  const { data: newIngredientInfo } = await axios.get(
    `http://localhost:9500/ingredients/${ingredient.name}`
  );
  let creatableIngredient = {
    name: ingredient.name,
    kCalPerG: null,
    proteinPerG: null,
    lipidPerG: null,
    carbsPerG: null,
  };
  if (newIngredientInfo.name) {
    creatableIngredient = {
      name: ingredient.name.toLowerCase(),
      kCalPerG: String(newIngredientInfo.per100g.kcal / 100),
      proteinPerG: String(newIngredientInfo.per100g.protein / 100),
      lipidPerG: String(newIngredientInfo.per100g.lipid / 100),
      carbsPerG: String(newIngredientInfo.per100g.carbohydrate / 100),
    };
  }
  const addedIngredient = await ingredientRepository.addIngredient(
    creatableIngredient
  );
  return {
    id: addedIngredient.id,
    name: addedIngredient.name,
    kCal: Number(addedIngredient.kCalPerG) * Number(ingredient.amount),
    protein: Number(addedIngredient.proteinPerG) * Number(ingredient.amount),
    carbs: Number(addedIngredient.carbsPerG) * Number(ingredient.amount),
    lipids: Number(addedIngredient.lipidPerG) * Number(ingredient.amount),
    amount: ingredient.amount,
  };
}
