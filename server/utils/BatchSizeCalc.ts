import {
  defaultBatchSize,
  defaultMaxDocs,
  defaultRequestLimit,
} from "../VectorDB/keys";

const batchSize = (Length: number) => {
  if (Length > defaultMaxDocs) {
    console.warn("The document is too large to process in non premium mode");
    return defaultBatchSize;
  }

  if (Length > defaultRequestLimit) {
    let quotient = Math.floor(Length / defaultRequestLimit);
    console.log("initial batchsize : ", quotient);
    return quotient;
  } else {
    return Length; // If docs is below 50, return it as is
  }
};

export function getCalculatedBatchSize(docLength: number) {
  const finalLength = batchSize(docLength);
  return finalLength === docLength ? 1 : finalLength;
}
