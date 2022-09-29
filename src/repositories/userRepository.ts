import { prisma } from "../databaseStrategy/database";
import { TUser } from "../interfaces/interfaces";

export async function insertUser(userData: TUser) {
  await prisma.user.create({
    data: userData,
  });
}

export async function findSingleUser(email: string) {
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return result;
}

export async function findSingleUserByUsername(userName: string) {
  const result = await prisma.user.findUnique({
    where: {
      userName,
    },
  });
  return result;
}

export async function findUserById(id: number) {
  const result = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      userName: true,
      profilePicture: true,
    },
  });
  return result;
}

export async function getAllUsersEmails() {
  const result = await prisma.user.findMany({
    select: {
      email: true,
    },
  });
  return result;
}
