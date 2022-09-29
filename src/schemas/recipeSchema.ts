import joi from "joi";

export const recipeSchema = joi.object({
  title: joi.string().required(),
  category: joi.string().required(),
  pictureUrl: joi.string().uri().required(),
  instructions: joi.string().min(20).required(),
  difficulty: joi.number().min(1).max(5).required(),
  ingredients: joi.array().required(),
});
