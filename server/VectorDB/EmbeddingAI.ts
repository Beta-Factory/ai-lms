import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";

import { getCalculatedBatchSize } from "../utils/BatchSizeCalc";
import { defaultAIembeddingModel, TOGETHER_AI_API_KEY } from "../utils/keys";

// taking the length of the text from load.ts

export const getAiEmbeddings = (docLength: number) => {
  const finalBatchSize = getCalculatedBatchSize(docLength);

  console.log("batchSize : ", finalBatchSize); // ! Debugging

  return new TogetherAIEmbeddings({
    apiKey: TOGETHER_AI_API_KEY,
    model: defaultAIembeddingModel, // larger token size
    batchSize: finalBatchSize, // the number of documents to process in a batch (more = less requests/minute)
  });
};
