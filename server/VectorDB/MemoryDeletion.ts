import { DataAPIClient } from "@datastax/astra-db-ts";
import {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_NAMESPACE,
} from "./keys";
import { Request, Response } from "express";

// Function to delete the collection
export const deleteCollection = async (req: Request, res: Response) => {
  try {
    // Initialize the client
    const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN as string);
    const db = client.db(ASTRA_DB_API_ENDPOINT as string, {
      namespace: ASTRA_DB_NAMESPACE as string,
    });

    const del = await db.dropCollection(ASTRA_DB_COLLECTION as string);

    console.log("Collection deleted successfully:", del);
    res.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error(
      "Error deleting collection:",
      error ? error : "An unknown error occurred"
    );
  }
};
