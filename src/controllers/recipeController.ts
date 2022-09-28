import { Request, Response } from "express";

export async function addNewRecipe(req: Request, res: Response) {
  const user = res.locals.user;
  console.log(req.body, user);
  res.sendStatus(201);
}
