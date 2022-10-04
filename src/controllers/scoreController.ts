import { Request, Response } from "express";

import { INewScoreData } from "../interfaces/interfaces";
import * as scoreService from "../services/scoreService";

export async function registerScore(req: Request, res: Response) {
  const { id: userId } = res.locals.user;
  const newScoreData: INewScoreData = req.body;
  const result = await scoreService.registerScore(userId, newScoreData);
  res.status(201).send(result);
}
