import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";

export const authenticateUser = (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> | void => {
	try {
		const token = req.header("Authorization")?.split(" ")[1];
		if (!token) {
			res.status(401).json({
				message: "Access denied, no token provided",
			});
			return;
		}

		const decoded = verifyToken(token as string) as { id: string };
		req.headers["user"] = decoded.id;
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid or expired token" });
	}
};
