import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI as string);
		console.log("DB CONNECTED");
	} catch (error) {
		console.log("Error connecting to DB", error);
		process.exit(1);
	}
};

export default connectDB;
