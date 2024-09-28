import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./keys";
import { VectorStoreRetriever } from "@langchain/core/vectorstores";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";

const combineDocs = (docs: any) => {
  return docs.map((doc: any) => doc.pageContent).join("\n\n");
};

export const chatWithAI = async (
  text: string,
  retriever: VectorStoreRetriever<AstraDBVectorStore>
) => {
  const translationQuestionTemplate = `Translate the following question into English if it is in Japanese, otherwise correct its punctuation. 
  question : {question}
  translatedQuestion : 
    `;

  const compactQuestionTemplate = `Convert the following question into a compact format. 
  question : {translatedQuestion} 
  compactedQuestion :
    `;

  const answerTemplate = `You are an AI agent trained on the context provided. Answer based on the provided context.
  If the context does not provide the answer, say "I don't have information about that."
  context : {context}
  question : {transQuestion}
  answer :
  `;

  const translatedAnswerTemplate = `Translate the answer in Japanese regardless of the language 
language : {language}
answer : {answer}
translatedAnswer : 
`;

  const translationChain = PromptTemplate.fromTemplate(
    translationQuestionTemplate
  )
    .pipe(llm)
    .pipe(new StringOutputParser());

  const compactChain = PromptTemplate.fromTemplate(compactQuestionTemplate)
    .pipe(llm)
    .pipe(new StringOutputParser());

  const answerChain = PromptTemplate.fromTemplate(answerTemplate)
    .pipe(llm)
    .pipe(new StringOutputParser());

  const translatedAnswerChain = PromptTemplate.fromTemplate(
    translatedAnswerTemplate
  )
    .pipe(llm)
    .pipe(new StringOutputParser());

  const retrieverChain = RunnableSequence.from([
    (prevRes) => prevRes.compactQuestion,
    retriever,
    combineDocs,
  ]);

  const chain = RunnableSequence.from([
    {
      translatedQuestion: translationChain,
      originalQuestionLang: new RunnablePassthrough(),
    },
    {
      compactQuestion: compactChain,
      compactInput: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      transQuestion: ({ compactInput }) => compactInput?.translatedQuestion,
    },
    {
      language: ({ compactInput }) =>
        compactInput?.originalQuestionLang?.question,
      answer: answerChain,
    },
    translatedAnswerChain,
  ]);

  const response = await chain.invoke({
    question: text,
  });

  return response;
};
