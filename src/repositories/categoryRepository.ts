import { prisma } from "../databaseStrategy/database";

export async function findCategoryByName(name: string) {
  return await prisma.category.findFirst({
    where: {
      name,
    },
  });
}

export async function findCategoryById(id: number) {
  return await prisma.category.findFirst({
    where: {
      id,
    },
  });
}

export async function createCategory(name: string) {
  return await prisma.category.create({
    data: {
      name,
    },
  });
}
