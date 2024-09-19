import { astraConfig } from "./keys";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";

export const uploadDocsToDatabase = async (splittedTextOutput: []) => {
  await AstraDBVectorStore.fromTexts(
    splittedTextOutput,
    [{ foo: "foo" }, { foo: "bar" }, { foo: "baz" }],
    new TogetherAIEmbeddings({
      model: "togethercomputer/m2-bert-80M-8k-retrieval",
    }),
    astraConfig
  );
};
