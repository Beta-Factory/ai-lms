import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { OpenAIEmbeddings } from "@langchain/openai";
import {
  AstraDBVectorStore,
  AstraLibArgs,
} from "@langchain/community/vectorstores/astradb";
// import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";
import dotenv from "dotenv";
dotenv.config();
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import * as fs from "fs";
import { getAiEmbeddings } from "./EmbeddingAI";
// import { DBchecker } from "../utils/DBchecker";
import { astraConfig } from "./DBconfig";

// const nike10kPdfPath = "../";

// const loader = new PDFLoader(nike10kPdfPath);
export let textLength: number = 0;
const FILE_PATH = "./sample"; // Path to your document
const TOGETHER_AI_API_KEY = process.env.TOGETHER_AI_API_KEY;

// const togetherAiEmbeddings = new TogetherAIEmbeddings({
//   apiKey: TOGETHER_AI_API_KEY as string,
//   model: "togethercomputer/m2-bert-80M-8k-retrieval", // larger token size
//   batchSize: 32, // the number of documents to process in a batch (more = less requests/minute)
// });

async function load_docs() {
  const files = fs.readdirSync(FILE_PATH);
  let loader;

  try {
    if (files.length === 0) {
      return null;
    }

    if (files.some((file) => file.endsWith(".txt"))) {
      loader = new DirectoryLoader(FILE_PATH, {
        ".txt": (path) => new TextLoader(path),
      });
    } else if (files.some((file) => file.endsWith(".pdf"))) {
      loader = new DirectoryLoader(FILE_PATH, {
        ".pdf": (path) => new PDFLoader(path),
      });
    } else if (files.some((file) => file.endsWith(".csv"))) {
      loader = new DirectoryLoader(FILE_PATH, {
        ".csv": (path) => new CSVLoader(path),
      });
    } else {
      throw new Error("File type not supported !.");
    }

    // const loader = new DirectoryLoader(FILE_PATH, {
    //   ".txt": (path) => new TextLoader(path),
    //   ".pdf": (path) => new PDFLoader(path),
    //   ".csv": (path) => new CSVLoader(path),
    // });
    const docs = (await loader.load()) as unknown as { pageContent: string }[];

    const docsToStringArray = docs.map(
      (doc: { pageContent: string }) => doc.pageContent
    );
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 10000,
      separators: ["\n\n", "\n", " ", ""],
      chunkOverlap: 1600,
    });

    const texts = await splitter.splitDocuments(docs);
    // console.log(texts); // ! Debugging
    console.log("Loaded ", texts.length, " documents."); // ! Debugging

    textLength = texts.length;

    return texts;
  } catch (error) {
    console.error("Error loading documents:", error);
    throw error;
  }
}

// // Load documents and handle any errors

export let vectorStorePromise: Promise<AstraDBVectorStore> | null = null;
export async function getVectorStore() {
  if (!vectorStorePromise) {
    vectorStorePromise = (async () => {
      try {
        const documents = await load_docs();

        // batchsize calculation for rate limiting

        // check if there is items in db

        // const vectorStore = await AstraDBVectorStore.fromDocuments(
        //   documents,
        //   getAiEmbeddings(),
        //   astraConfig
        // );

        // ? ==============Initialize the vector store=====================.
        const vectorStore = await AstraDBVectorStore.fromExistingIndex(
          getAiEmbeddings(),
          astraConfig
        );

        await vectorStore.addDocuments(documents ? documents : []);
        console.log("====== added to db ======");

        return vectorStore;
      } catch (error) {
        console.error("Error initializing vector store:", error);
        throw error;
      }
    })();
  }
  return vectorStorePromise;
}
