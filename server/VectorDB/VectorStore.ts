import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { fileName, load_docs, textLength } from "../utils/load";
import {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_NAMESPACE,
} from "../utils/keys";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { getAiEmbeddings } from "./EmbeddingAI";
import { setAstraConfig } from "./DBconfig";

export let vectorStorePromise: Promise<AstraDBVectorStore> | null = null;
export async function getVectorStore() {
  if (!vectorStorePromise) {
    vectorStorePromise = (async () => {
      try {
        const documents = await load_docs();
        if (!documents || documents.length === 0) {
          console.warn("No documents to process....");
        }

        // ? =============== connect to db ================

        const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN as string);
        const db = client.db(ASTRA_DB_API_ENDPOINT as string, {
          namespace: ASTRA_DB_NAMESPACE as string,
        });
        const collections = await db.listCollections();
        console.warn(
          "Collections : ",
          collections.find((c) => c.name === fileName) ? fileName : "not found"
        );

        // ? ==============Initialize the vector store=====================
        // todo : add namespace logic
        const vectorStore = await AstraDBVectorStore.fromExistingIndex(
          getAiEmbeddings(textLength),
          setAstraConfig(fileName) // ! fileName is the collection name and namespace will be username(to be implemented)
        );

        if (
          collections.find((c) => c.name === vectorStore.lc_kwargs.collection)
        ) {
          console.warn("Collection already exists"); // ! Debugging
        } else {
          await vectorStore.addDocuments(documents ? documents : []);
          console.warn("====== new docs added to db ======");
        }

        return vectorStore;
      } catch (error) {
        console.error("Error initializing vector store:", error);
        throw error;
      }
    })();
  }
  return vectorStorePromise;
}
