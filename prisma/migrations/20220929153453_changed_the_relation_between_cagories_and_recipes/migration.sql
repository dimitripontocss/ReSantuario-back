/*
  Warnings:

  - You are about to drop the `categories_recipes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories_recipes" DROP CONSTRAINT "categories_recipes_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "categories_recipes" DROP CONSTRAINT "categories_recipes_recipeId_fkey";

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "categories_recipes";

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
