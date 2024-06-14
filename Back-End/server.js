import path from "path";
import express from "express";
import { app, server } from "./socket/socket.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";



dotenv.config()

const __dirname = path.resolve();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/Front-End/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Front-End", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});