import { createClient } from "@supabase/supabase-js";
import { ChatOpenAI } from "@langchain/openai";
import { AstraLibArgs } from "@langchain/community/vectorstores/astradb";
import dotenv from "dotenv";

dotenv.config();

export const sbApiKey = process.env.SUPABASE_API_KEY as string;
export const sbUrl = process.env.SUPABASE_PROJECT_URL as string;
export const openAIApiKey = process.env.OPENAI_API_KEY as string;
export const sbClient = createClient(sbUrl, sbApiKey);
export const llm = new ChatOpenAI({ openAIApiKey });
export const astraConfig: AstraLibArgs = {
  token: process.env.ASTRA_DB_APPLICATION_TOKEN as string,
  endpoint: process.env.ASTRA_DB_ENDPOINT as string,
  collection: process.env.ASTRA_DB_COLLECTION as string,
  collectionOptions: {
    vector: {
      dimension: process.env.MODEL_DIMENSIONS as unknown as number,
      metric: "cosine",
    },
  },
};
export const togetherAIModel = process.env.TOGETHER_AI_EMBEDDED_MODEL as string;
