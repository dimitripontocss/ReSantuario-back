import joi from "joi";

export const signUpSchema = joi.object({
  userName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  passwordConfirmation: joi.string().equal(joi.ref("password")).required(),
  profilePicture: joi.string().uri().required(),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
