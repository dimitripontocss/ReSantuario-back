import { Request, Response } from "express";

export async function addNewRecipe(req: Request, res: Response) {
  const user = res.locals.user;

  res.sendStatus(201);
}
