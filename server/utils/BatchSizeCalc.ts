const batchSize = (textLength: number) => {
  if (textLength >= 50) {
    let quotient = Math.ceil(textLength / 50);
    return quotient;
  } else {
    return textLength; // If docs is below 50, return it as is
  }
};

export function getCalculatedBatchSize(textLength: number) {
  return batchSize(textLength) === textLength ? 1 : batchSize(textLength);
}
