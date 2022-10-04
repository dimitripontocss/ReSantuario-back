import { Router } from "express";

import { jtwAuth } from "../middlewares/jwtAuthMiddleware";
import { schemasMiddleware } from "../middlewares/schemasMiddleware";
import { scoreSchema } from "../schemas/scoreSchema";
import { registerScore } from "../controllers/scoreController";

const scoreRouter = Router();

scoreRouter.post(
  "/score",
  jtwAuth,
  schemasMiddleware(scoreSchema),
  registerScore
);

export default scoreRouter;
