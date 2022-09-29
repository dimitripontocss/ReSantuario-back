import { User, Ingredient, Recipe, NutritionalTable } from "@prisma/client";

export type TUser = Omit<User, "id" | "profilePicture">;
export type TIngredient = Omit<Ingredient, "id">;
export type TRecipe = Omit<Recipe, "id">;
export type TNutritionalTable = Omit<NutritionalTable, "id">;

export interface INewUserData {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IIngredient {
  name: string;
  amount: string;
}

export interface INewRecipeData {
  title: string;
  pictureUrl: string;
  instructions: string;
  category: string;
  difficulty: number;
  ingredients: IIngredient[];
}

export interface IError {
  name: string;
  message: string;
}
