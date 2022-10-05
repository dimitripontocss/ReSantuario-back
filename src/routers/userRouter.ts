import { Router } from "express";

import { signup, signin, getUserInfoById } from "../controllers/userController";
import { schemasMiddleware } from "../middlewares/schemasMiddleware";
import { signInSchema, signUpSchema } from "../schemas/userSchema";

const userRouter = Router();

userRouter.post("/signup", schemasMiddleware(signUpSchema), signup);
userRouter.post("/signin", schemasMiddleware(signInSchema), signin);
userRouter.get("/user/:userId", getUserInfoById);

export default userRouter;
