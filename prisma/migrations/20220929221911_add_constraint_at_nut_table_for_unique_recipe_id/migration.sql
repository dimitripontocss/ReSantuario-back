/*
  Warnings:

  - A unique constraint covering the columns `[recipeId]` on the table `nutritional_table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "nutritional_table_recipeId_key" ON "nutritional_table"("recipeId");
