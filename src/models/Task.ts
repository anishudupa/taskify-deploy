import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
	title: string;
	description: string;
	priority: string;
	status: string;
	user: unknown;
}

const taskSchema: Schema = new Schema<ITask>(
	{
		title: { type: String, required: true },
		description: { type: String },
		status: { type: String, default: "Pending" },
		priority: { type: String, default: "Low" },
		user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
