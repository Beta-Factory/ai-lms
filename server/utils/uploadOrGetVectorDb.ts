import { getAstraConfig } from "./keys";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";

export const uploadDocsToDatabase = async (
  splittedTextOutput: [],
  collectionName: string
) => {
  const astraConfig = getAstraConfig(collectionName);
  const vectorStore = await AstraDBVectorStore.fromTexts(
    splittedTextOutput,
    [{ foo: "foo" }, { foo: "bar" }, { foo: "baz" }],
    new TogetherAIEmbeddings({
      model: "togethercomputer/m2-bert-80M-8k-retrieval",
    }),
    astraConfig
  );
  const retriever = vectorStore.asRetriever();
  return retriever;
};

export const obtainRetrieverOfExistingVectorDb = async (
  collectionName: string
) => {
  const astraConfig = getAstraConfig(collectionName);
  const vectorStore = await AstraDBVectorStore.fromExistingIndex(
    new TogetherAIEmbeddings({
      model: "togethercomputer/m2-bert-80M-8k-retrieval",
    }),
    astraConfig
  );
  const retriever = vectorStore.asRetriever();
  return retriever;
};
