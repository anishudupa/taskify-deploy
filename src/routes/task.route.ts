import express from "express";
import {
	createTask,
	deleteTask,
	getTasks,
	updateTask,
} from "../controllers/task.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";

const router = express.Router();

router.post("/", authenticateUser, validate(createTaskSchema), createTask);
router.put("/:id", authenticateUser, validate(updateTaskSchema), updateTask);
router.delete("/:id", authenticateUser, deleteTask);
router.get("/", authenticateUser, getTasks);

export default router;
