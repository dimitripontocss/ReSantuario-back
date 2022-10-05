import { Request, Response } from "express";

import { INewUserData, TUser } from "../interfaces/interfaces";
import * as userService from "../services/userService";

export async function signup(req: Request, res: Response) {
  const newUserData: INewUserData = req.body;
  await userService.signUpService(newUserData);
  res.sendStatus(201);
}

export async function signin(req: Request, res: Response) {
  const userData: TUser = req.body;
  const { token, userName, userId } = await userService.signInService(userData);
  res.status(200).send({ token, userName, userId });
}
