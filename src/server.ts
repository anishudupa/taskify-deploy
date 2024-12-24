import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/user.route";
import taskRoutes from "./routes/task.route";
import path from "path";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
dotenv.config();

app.use(express.static(path.join(__dirname, "../client")));

app.get("/api", (_, res: Response) => {
	res.json({ message: "api is running" });
});

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("*", (_: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../client", "index.html"));
});
app.listen(process.env.PORT || 5000, () => console.log("Server is running"));

export default app;
