import { Request, Response, NextFunction } from "express";

import { IError } from "../interfaces/interfaces";

export default function errorHandlingMiddleware(error: IError | Error, req: Request, res: Response, next: NextFunction) {
	if(error.name === "Already used"){
		return res.status(409).send(error.message);
	}
	if(error.name === "error_email"){
		return res.status(500).send(error.message);
	}
	if(error.name === "auth_error"){
		return res.status(401).send(error.message);
	}
	if(error.name === "not_found"){
		return res.status(404).send(error.message);
	}
	return res.sendStatus(500);
}


