// ! doing in plain js bcz ts-node just won't work today for some reason

// import express, { Application, Request, Response, NextFunction } from "express";
// import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";

// // Load environment variables from .env file
dotenv.config();

// const app: Application = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Basic route
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, this is the server!");
// });

// // Error handling middleware
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const model = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0,
});

const messages = [
  new SystemMessage("Translate the following from English into japanese"),
  new HumanMessage("hello my name is parwez!"),
];

// const result = await model.invoke(messages);

const parser = new StringOutputParser();
// await parser.invoke(result);

const chain = model.pipe(parser);

// ? This chain takes on the input type of the language model (string or list of message) and returns the output type of the output parser (string).

await chain.invoke(messages);
