import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (error: any) {
			res.status(400).json({
				message: "validation error",
				error: error.errors,
			});
		}
	};
