import { z } from "zod";

export const createTaskSchema = z.object({
	body: z.object({
		title: z.string().min(1, "Title is required"),
		description: z.string().optional(),
		status: z.enum(["Pending", "Completed", "In Progress"]).optional(),
		priority: z.enum(["Low", "Medium", "High"]).optional(),
	}),
});

export const updateTaskSchema = z.object({
	body: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		status: z.enum(["Pending", "Completed", "In Progress"]).optional(),
		priority: z.enum(["Low", "Medium", "High"]).optional(),
	}),
	params: z.object({
		id: z.string().min(1, "Task id is required"),
	}),
});
