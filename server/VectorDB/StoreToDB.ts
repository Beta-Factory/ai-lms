import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { getVectorStore, vectorStorePromise } from "./load";
import { Request, Response } from "express";

export let vectorStoreValues: AstraDBVectorStore | null = null;

export async function StoreToDB(req: Request, res: Response) {
  try {
    await getVectorStore();
    vectorStoreValues = await vectorStorePromise; // Store the vector store in a variable

    res.status(200).send("Data loaded to database!");
  } catch (error) {
    console.error("Error storing to database:", error);
    res.status(500).send("Error storing to database");
  }
}
