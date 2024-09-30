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
  retriever: VectorStoreRetriever<AstraDBVectorStore>,
  context: string,
  prevChats: {
    human?: string;
    ai?: string;
  }[]
) => {
  const translationQuestionTemplate = `Given a conversation history (if any) and a question, translate the following question into English if it is in Japanese, otherwise correct its punctuation. 
  question : {question}
  translatedQuestion : 
  `;

  const compactQuestionTemplate = `Convert the following question into a compact format. 
  question : {translatedQuestion} 
  compactedQuestion :
  `;

  const answerTemplate = `${context}
  You are a friendly AI agent who answers in a very polite and enthusiastic manner. Try to find the answer provided from the conversation history and if you still don't know the answer from the context provided just say "I don't have that information."
  Answer accordingly to the context and question and conversation history (if any) as mentioned below. 
  context : {context}
  conversation history : {convo_history}
  question : {transQuestion}
  answer :
  `;

  const translatedAnswerTemplate = `Translate the answer into Japanese regardless of the language.
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

  const formatConvoHistory = (chats: any) => {
    return chats
      .map(
        (chat: any) =>
          `Human: ${chat.human || "No message"}\nAI: ${
            chat.ai || "No response"
          }`
      )
      .join("\n\n");
  };

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
      convo_history: ({ compactInput }) => formatConvoHistory(prevChats),
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
    convo_history: formatConvoHistory(prevChats),
  });

  return response;
};
