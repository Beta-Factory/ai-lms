// import express from "express";
import express, { Request, Response, NextFunction } from "express";
import { FileCleaner } from "./utils/FileCleaner";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { AIChat } from "./LangChain/Chat";
import { deleteCollection } from "./VectorDB/MemoryDeletion";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, this is the server!");
});

app.delete("/memory-wipe", deleteCollection);

// AI Chat route
app.post("/ai-chat", AIChat);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize the FileCleaner
// FileCleaner.init();
