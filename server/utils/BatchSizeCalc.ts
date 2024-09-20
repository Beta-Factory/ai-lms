const batchSize = (Length: number) => {
  if (Length > 50) {
    let quotient = Math.floor(Length / 50);
    console.log("initial batchsize : ", quotient);
    if (quotient > 900) {
      quotient = 512;
      console.log(
        "reduced batchsize so that the MFing wifi doesn't shutdown : ",
        quotient
      );
    }
    return quotient;
  } else {
    return Length; // If docs is below 50, return it as is
  }
};

export function getCalculatedBatchSize(docLength: number) {
  const finalLength = batchSize(docLength);
  return finalLength === docLength ? 1 : finalLength;
}
