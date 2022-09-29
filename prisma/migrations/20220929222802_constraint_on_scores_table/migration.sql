/*
  Warnings:

  - A unique constraint covering the columns `[userId,recipeId]` on the table `scores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "scores_userId_recipeId_key" ON "scores"("userId", "recipeId");
