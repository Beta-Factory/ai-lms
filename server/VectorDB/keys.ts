import dotenv from "dotenv";
dotenv.config();

export const TOGETHER_AI_API_KEY = process.env.TOGETHER_AI_API_KEY as string;

export const LANGCHAIN_TRACING_V2 = process.env.LANGCHAIN_TRACING_V2;
export const LANGCHAIN_ENDPOINT = process.env.LANGCHAIN_ENDPOINT as string;
export const LANGCHAIN_API_KEY = process.env.LANGCHAIN_API_KEY as string;
export const LANGCHAIN_PROJECT = process.env.LANGCHAIN_PROJECT as string;

export const ASTRA_DB_ID = process.env.ASTRA_DB_ID as string;
export const ASTRA_DB_API_ENDPOINT = process.env
  .ASTRA_DB_API_ENDPOINT as string;
export const ASTRA_DB_APPLICATION_TOKEN = process.env
  .ASTRA_DB_APPLICATION_TOKEN as string;
export const ASTRA_DB_NAMESPACE = process.env.ASTRA_DB_NAMESPACE as string;
export const ASTRA_DB_COLLECTION =
  process.env.ASTRA_DB_COLLECTION || ("vector_store" as string);

// ================= values =================

export const defaultBatchSize = 512;
export const defaultChunkSize = 10000;
export const defaultChunkOverlap = 1600;
export const defaultDimension = 768;
export const defaultMetric = "cosine";
export const defaultMaxDocs = 25600;
export const defaultRequestLimit = 50;
export const defaultPremiumRequestLimit = 80085; // ? Premium request limit to be seen later
