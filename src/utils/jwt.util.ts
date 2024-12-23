import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
export const genereateToken = (userId: string) => {
	return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "2 days" });
};

export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		throw new Error("invalid or expired token");
	}
};
