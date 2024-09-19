import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { getVectorStore } from "./load";
import { Request, Response } from "express";

export let vectorStore: AstraDBVectorStore | null = null;

export async function StoreToDB(req: Request, res: Response) {
  try {
    vectorStore = await getVectorStore(); // Store the vector-store values in a variable
    // console.log(vectorStore); // ! Debugging
    res.status(200).send("Data loaded to database!");
  } catch (error) {
    console.error("Error storing to database:", error);
    res.status(500).send("Error storing to database");
  }
}
