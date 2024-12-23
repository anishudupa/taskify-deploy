import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { genereateToken } from "../utils/jwt.util";
import { ObjectId } from "mongoose";

export const registerUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { username, email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			res.status(400).json({ message: "user already exists" });
			return;
		}
		const hashedPassword = await bcrypt.hash(password, 13);

		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();
		res.status(201).json({ message: "user created successfully" });
		return;
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({ message: "Invalid credentials" });
			return;
		}

		const isMatch = await bcrypt.compare(password, user!.password);
		if (!isMatch) {
			res.status(400).json({ message: "Invalid credentials" });
			return;
		}

		const token = genereateToken((user!._id as ObjectId).toString());
		res.json({ message: "logged in successfully", token });
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await User.findById(req.headers["user"]).select("-password");
		if (!user) {
			res.status(400).json({ message: "cannot find user" });
			return;
		}
		res.json({ user });
	} catch (error) {
		res.status(500).json({ message: "server error", error });
	}
};
