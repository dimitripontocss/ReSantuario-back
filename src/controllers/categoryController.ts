import { Request, Response } from "express";

import * as categoryService from "../services/categoryService";

export async function getAllCategoryInfo(req: Request, res: Response) {
  const categoryId = +req.params.categoryId;
  const AllInfo = await categoryService.getAllCategoryInfo(categoryId);
  res.status(200).send(AllInfo);
}
