import { Request, Response, NextFunction } from "express";
export const schemasMiddleware = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      console.log(validation.error.details);
      res.status(422).send("Verifique suas respostas e tente novamente.");
      return;
    }
    next();
  };
};
