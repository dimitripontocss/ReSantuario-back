import { Router } from "express";

import { getAllCategoryInfo } from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/category/:categoryId", getAllCategoryInfo);

export default categoryRouter;
