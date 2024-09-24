// Specify the database and collection to use.

import {
  AstraDBVectorStore,
  AstraLibArgs,
} from "@langchain/community/vectorstores/astradb";
import { getAiEmbeddings } from "./EmbeddingAI";
import { defaultDimension, defaultMetric } from "../utils/keys";

// If the collection does not exist, it is created automatically.
export const astraConfig: AstraLibArgs = {
  token: process.env.ASTRA_DB_APPLICATION_TOKEN as string,
  endpoint: process.env.ASTRA_DB_API_ENDPOINT as string,
  namespace: process.env.ASTRA_DB_NAMESPACE as string,
  collection: (process.env.ASTRA_DB_COLLECTION as string) || "vector_store",
  collectionOptions: {
    vector: {
      dimension: defaultDimension, // not 1536
      metric: defaultMetric,
    },
  },
};
