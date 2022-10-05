import { prisma } from "../databaseStrategy/database";
import { TNutritionalTable } from "../interfaces/interfaces";

export async function createNutritionalTable(
  nutritionalTable: TNutritionalTable
) {
  return await prisma.nutritionalTable.create({
    data: nutritionalTable,
  });
}

export async function findNTableByRecipeId(recipeId: number) {
  return await prisma.nutritionalTable.findFirst({
    where: { recipeId },
  });
}

export async function deleteNutritionalTable(recipeId: number) {
  await prisma.nutritionalTable.delete({ where: { recipeId } });
}
