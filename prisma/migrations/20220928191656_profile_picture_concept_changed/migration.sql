/*
  Warnings:

  - You are about to drop the `profile-picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile-picture" DROP CONSTRAINT "profile-picture_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profilePicture" TEXT;

-- DropTable
DROP TABLE "profile-picture";
