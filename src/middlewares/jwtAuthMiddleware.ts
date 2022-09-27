import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import * as userService from "../services/userService";

export async function jtwAuth(req: Request, res: Response, next:NextFunction){
    const authorization = req.headers['authorization'];
  if (!authorization) throw {name: "not_found", message: "Missing authorization header"};

  const token = authorization.replace('Bearer ', '');
  if (!token) throw {name: "not_found", message: "Missing token"};

  try {
    const JWT_KEY = process.env.JWT_KEY;
    const { userId } = jwt.verify(token, JWT_KEY) as { userId: number };
    const user = await userService.findPossibleUserById(userId);
    res.locals.user = user;
    next();
  } catch {
    throw {name: "auth_error", message: "Invalid token"};
  }
}