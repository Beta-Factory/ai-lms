// ! doing in plain js bcz ts-node just won't work today for some reason

import express, { Application, Request, Response, NextFunction } from "express";
// import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ChatMistralAI, MistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";

// // Load environment variables from .env file
dotenv.config();



export const AIChat = async (req:Request, res:Response) => {
  try {
    // const model = new ChatMistralAI({
    //   model: "codestral-latest",
    //   temperature: 0,
    // });
    const { role, text } = req.body;

    const metaLlamaModel = new ChatTogetherAI({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
      temperature: 0.5,
      maxTokens: 512,

      topP: 0.7,
      topK: 50,
      //   repetitionPenalty: 1,

      //   stop: ["<|eot_id|>", "<|eom_id|>"],
      //   stream: True,

      // other params...
    });

    // const model = new MistralAI({
    //   model: "codestral-latest",
    //   temperature: 0,
    //   maxTokens: 50,
    //   maxRetries: 2,
    //   // other params...
    // });

    const systemTemplate =
      "You are a very good and professional {role} who answers the students with accurate information and detailed explanation:";

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "{text}"],
    ]);

    //   const messages = [
    //     new SystemMessage("Translate the following from English into japanese"),
    //     new HumanMessage("hello my name is parwez!"),
    //   ];

    // const result = await model.invoke(messages);

    const parser = new StringOutputParser();
    // await parser.invoke(result);

    const chain = promptTemplate.pipe(metaLlamaModel).pipe(parser);

    // ? This chain takes on the input type of the language model (string or list of message) and returns the output type of the output parser (string).

    let result = await chain.invoke({
      role: role,
      text: text,
    });

    res.json(result);
    console.log(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
