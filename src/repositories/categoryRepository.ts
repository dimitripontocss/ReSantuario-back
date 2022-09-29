import { prisma } from "../databaseStrategy/database";

export async function findCategoryByName(name: string) {
  const result = await prisma.category.findFirst({
    where: {
      name,
    },
  });
  return result;
}

export async function createCategory(name: string) {
  const result = await prisma.category.create({
    data: {
      name,
    },
  });
  return result;
}
