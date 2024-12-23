import express from "express";
import {
	loginUser,
	registerUser,
	getUser,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerUserSchema, loginUserSchema } from "../schemas/user.schema";
import { authenticateUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);
router.get("/get-user", authenticateUser, getUser);

export default router;
