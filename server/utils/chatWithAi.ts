import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { PromptTemplate } from "@langchain/core/prompts";
import { togetherLlm } from "./keys";
import { VectorStoreRetriever } from "@langchain/core/vectorstores";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const chatWithAI = async (
  text: string,
  retriever: VectorStoreRetriever<AstraDBVectorStore>
) => {
  const compactQuestionTemplate =
    "Given a question or a demand, convert it into a compact and standalone question. question : {question} compactedQuestion :";
  const compactPrompt = PromptTemplate.fromTemplate(compactQuestionTemplate);

  const chain = compactPrompt
    .pipe(togetherLlm)
    .pipe(new StringOutputParser())
    .pipe(retriever);
  const response = await chain.invoke({
    question: text,
  });
  return response;
};
