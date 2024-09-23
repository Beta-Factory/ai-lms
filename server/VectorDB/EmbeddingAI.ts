import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";
import { TOGETHER_AI_API_KEY } from "./keys";
import { getCalculatedBatchSize } from "../utils/BatchSizeCalc";

// taking the length of the text from load.ts

export const getAiEmbeddings = (docLength: number) => {
  const finalBatchSize = getCalculatedBatchSize(docLength);

  console.log("batchSize : ", finalBatchSize); // ! Debugging

  return new TogetherAIEmbeddings({
    apiKey: TOGETHER_AI_API_KEY as string,
    model: "togethercomputer/m2-bert-80M-32k-retrieval", // larger token size
    batchSize: finalBatchSize, // the number of documents to process in a batch (more = less requests/minute)
  });
};
