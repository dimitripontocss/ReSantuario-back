-- CreateTable
CREATE TABLE "nutritional_table" (
    "id" SERIAL NOT NULL,
    "kCal" TEXT,
    "protein" TEXT,
    "carbs" TEXT,
    "lipid" TEXT,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "nutritional_table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nutritional_table" ADD CONSTRAINT "nutritional_table_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
