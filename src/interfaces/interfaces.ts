import {
  User,
  Ingredient,
  NutritionalTable,
  Recipe,
  Category,
  Scores,
} from "@prisma/client";

export type TUser = Omit<User, "id" | "createdAt">;
export type TIngredient = Omit<Ingredient, "id">;
export type TRecipe = Omit<Recipe, "id" | "createdAt" | "viewCount">;
export type TNutritionalTable = Omit<NutritionalTable, "id">;
export type TScore = Omit<Scores, "id">;

export interface INewScoreData {
  score: number;
  recipeId: number;
}
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
  profilePicture: string;
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
