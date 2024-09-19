import { astraConfig, openAIApiKey } from "./keys";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

export const uploadDocsToDatabase = async (splittedTextOutput: []) => {
  await AstraDBVectorStore.fromTexts(
    splittedTextOutput,
    [{ foo: "foo" }, { foo: "bar" }, { foo: "baz" }],
    new OpenAIEmbeddings({ openAIApiKey }),
    astraConfig
  );
};
