import {
  User,
  Ingredient,
  NutritionalTable,
  Recipe,
  Category,
} from "@prisma/client";

export type TUser = Omit<User, "id" | "profilePicture">;
export type TIngredient = Omit<Ingredient, "id">;
export type TRecipe = Omit<Recipe, "id">;
export type TNutritionalTable = Omit<NutritionalTable, "id">;

export interface IRecipeMinimalData {
  id: number;
  pictureUrl: string;
  title: string;
  difficulty: number;
  categories: Category;
}
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
  portions: string;
  ingredients: IIngredient[];
}

export interface IError {
  name: string;
  message: string;
}
