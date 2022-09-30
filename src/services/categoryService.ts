import * as categoryRepository from "../repositories/categoryRepository";

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
