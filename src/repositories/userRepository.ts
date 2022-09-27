import { prisma } from "../databaseStrategy/database";
import { TUser } from "../interfaces/interfaces"

export async function insertUser(userData: TUser) {
    await prisma.user.create({
        data: userData
    })
}

export async function findSingleUser(email: string) {
    const result = await prisma.user.findUnique({
        where: {
            email
        }
    })
    return result;
}

export async function findUserById(id: number) {
    const result = await prisma.user.findUnique({
        where:{id}
    })
    return result;
}

export async function getAllUsersEmails() {
    const result = await prisma.user.findMany({
        select:{
            email:true
        }
    })
    return result;
}
