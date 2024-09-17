import express, { Application, Request, Response, NextFunction } from "express";
// import bodyParser from "body-parser";
import dotenv from "dotenv";
// import { ChatMistralAI, MistralAI } from "@langchain/mistralai";
// import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { getVectorStore } from "../VectorDB/load";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";

dotenv.config();

export const AIChat = async (req: Request, res: Response) => {
  try {
    // ? query the vector store
    const vectorStore = await getVectorStore();
    const vectorStoreRetriever = vectorStore.asRetriever();

    console.log("======vectorStoreRetriever======", vectorStoreRetriever); // ! Debugging

    // ------ AI Chat ------
    type Body = {
      text: string;
    };
    const { text }: Body = req.body;

    const metaLlamaModel = new ChatTogetherAI({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      temperature: 0.5,
      maxTokens: 1000,

      topP: 0.7,
      // topK: 50,
      //   repetitionPenalty: 1,

      //   stop: ["<|eot_id|>", "<|eom_id|>"],
      //   stream: True,

      // other params...
    });

    const SYSTEM_TEMPLATE = `
    If you don't know the answer, just say that you don't know, don't try to make up an answer.You are a very good and professional teacher who answers the students with accurate information and detailed explanation:

    Use the following pieces of context to answer the question at the end.
    ----------------
    {context}`;

    const messages = [
      SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
      HumanMessagePromptTemplate.fromTemplate("{question}"),
    ];

    const prompt = ChatPromptTemplate.fromMessages(messages);

    // const prompt = ChatPromptTemplate.fromMessages([
    //   ["system", SYSTEM_TEMPLATE],
    //   ["user", "{text}"],
    // ]);

    const parser = new StringOutputParser();
    const chain = RunnableSequence.from([
      {
        context: vectorStoreRetriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      metaLlamaModel,
      parser,
    ]);
    // ? This chain takes on the input type of the language model (string or list of message) and returns the output type of the output parser (string).

    let result = await chain.invoke(text);

    res.json(result);
    console.log(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};