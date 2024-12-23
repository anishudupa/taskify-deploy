import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
	const { title, description, status, priority } = req.body;
	try {
		const task = new Task({
			title,
			description,
			status,
			priority,
			user: req.headers["user"],
		});

		await task.save();
		res.status(201).json({ message: "success", task });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const getTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await Task.find({ user: req.headers["user"] });
		res.json({ message: "success", tasks });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const updateTask = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const task = await Task.findOneAndUpdate(
			{ _id: id, user: req.headers["user"] },
			updates,
			{ new: true }
		);
		if (!task) {
			res.status(400).json({ message: "Task not found" });
			return;
		}
		res.json(task);
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const deleteTask = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params;
	try {
		const task = await Task.findOneAndDelete({
			_id: id,
			user: req.headers["user"],
		});
		if (!task) {
			res.status(400).json({ message: "Task not found" });
			return;
		}
		res.json({ message: "Task deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
