import { z } from "zod";

export const registerUserSchema = z.object({
	body: z.object({
		username: z
			.string()
			.min(3, "Username must be atleast three characters long"),
		email: z.string().email("Invalid email format"),
		password: z.string().min(8, "Password must be atleast of length 8"),
	}),
});

export const loginUserSchema = z.object({
	body: z.object({
		email: z.string().email("Invalid email format"),
		password: z.string().min(8, "Password must be atleast of length 8"),
	}),
});
