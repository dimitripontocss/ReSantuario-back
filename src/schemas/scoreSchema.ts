import joi from "joi";

export const scoreSchema = joi.object({
  score: joi.number().min(1).max(5).required(),
  recipeId: joi.number().required(),
});
