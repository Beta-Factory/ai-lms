import { DataAPIClient } from "@datastax/astra-db-ts";
import {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_NAMESPACE,
} from "./keys";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { fileName } from "./load";

// Function to delete the collection
export const deleteCollection = async (req: Request, res: Response) => {
  try {
    // Initialize the client
    const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN as string);
    const db = client.db(ASTRA_DB_API_ENDPOINT as string, {
      namespace: ASTRA_DB_NAMESPACE as string,
    });

    // Get all collections
    const collections = await db.listCollections();

    // Drop each collection
    for (const collection of collections) {
      await db.collection(collection.name).drop();
      console.log(`Dropped collection: ${collection.name}`);
    }

    console.warn("Collection deleted successfully");
    return res
      .status(StatusCodes.OK)
      .json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error(
      "Error deleting collection:",
      error ? error : "An unknown error occurred"
    );
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error deleting collection",
      error,
    });
  }
};
