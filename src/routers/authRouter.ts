import { Router } from "express";

import { signup, signin } from "../controllers/authController";
import { schemasMiddleware } from "../middlewares/schemasMiddleware";
import { signInSchema,signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signup", schemasMiddleware(signUpSchema), signup);
authRouter.post("/signin", schemasMiddleware(signInSchema), signin);

export default authRouter;