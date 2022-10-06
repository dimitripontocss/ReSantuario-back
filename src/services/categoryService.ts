import * as categoryRepository from "../repositories/categoryRepository";
import * as recipeService from "./recipeService";

export async function verifyCategory(categoryName: string) {
  const possibleCategory = await categoryRepository.findCategoryByName(
    categoryName
  );
  if (possibleCategory) return possibleCategory.id;

  const newCategory = await categoryRepository.createCategory(categoryName);
  return newCategory.id;
}

export async function findCategoryById(categoryId: number) {
  return await categoryRepository.findCategoryById(categoryId);
}

export async function getAllCategoryInfo(categoryId: number) {
  const recipes = await recipeService.getAllRecipesByCategoryId(categoryId);
  const info = { id: recipes[0].categoryId, name: recipes[0].categoryName };

  return { info, recipes };
}
