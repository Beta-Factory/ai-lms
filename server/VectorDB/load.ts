import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { OpenAIEmbeddings } from "@langchain/openai";
import {
  AstraDBVectorStore,
  AstraLibArgs,
} from "@langchain/community/vectorstores/astradb";
import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";
import dotenv from "dotenv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import * as fs from "fs";

// const nike10kPdfPath = "../";

// const loader = new PDFLoader(nike10kPdfPath);

dotenv.config();

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

  // console.log("filename : ", fileNameWithoutExtension); // ! Debugging
  // const loader = new DirectoryLoader(FILE_PATH, {
  //   ".txt": (path) => new TextLoader(path),
  //   ".pdf": (path) => new PDFLoader(path),
  //   ".csv": (path) => new CSVLoader(path),
  // });
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10000,
    chunkOverlap: 1600,
  });

  const texts = await splitter.splitDocuments(docs);
  // console.log(texts); // ! Debugging
  console.log("Loaded ", texts.length, " documents."); // ! Debugging

  return texts;
}

// // Load documents and handle any errors
// load_docs().catch((error) => console.error("Failed to load documents:", error));

export let vectorStorePromise: Promise<AstraDBVectorStore> | null = null;

export async function getVectorStore() {
  if (!vectorStorePromise) {
    vectorStorePromise = (async () => {
      try {
        const texts = await load_docs();
        const textLength = texts.length;
        const batchSize = (textLength: number) => {
          if (textLength >= 50) {
            let quotient = Math.floor(textLength / 50);
            return quotient;
          } else {
            return textLength; // If docs is below 50, return it as is
          }
        };
        const finalBatchSize =
          batchSize(textLength) === textLength ? 1 : batchSize(textLength);

        // console.log(
        //   "======loaded texts documents.======",
        //   texts,
        //   "================"
        // ); // ! Debugging

        // console.log(typeof texts); // ! Debugging

        console.log(finalBatchSize); // ! Debugging

        // Specify the database and collection to use.
        // If the collection does not exist, it is created automatically.
        const astraConfig: AstraLibArgs = {
          token: process.env.ASTRA_DB_APPLICATION_TOKEN as string,
          endpoint: process.env.ASTRA_DB_API_ENDPOINT as string,
          namespace: process.env.ASTRA_DB_NAMESPACE as string,
          collection:
            (process.env.ASTRA_DB_COLLECTION as string) || "vector_store",
          collectionOptions: {
            vector: {
              dimension: 768, // not 1536
              metric: "cosine",
            },
          },
        };
        // console.log(astraConfig); // ! Debugging

        const togetherAiEmbeddings = new TogetherAIEmbeddings({
          apiKey: TOGETHER_AI_API_KEY as string,
          model: "togethercomputer/m2-bert-80M-8k-retrieval", // larger token size
          batchSize: finalBatchSize,
        });

        // check if the collection already exists
        const existingDocuments = await AstraDBVectorStore.fromExistingIndex(
          togetherAiEmbeddings,
          astraConfig
        );

        if (existingDocuments) {
          console.log("Loaded existing documents:", existingDocuments); // ! Debugging
          return existingDocuments;
        }

        // Initialize the vector store.
        const vectorStore = await AstraDBVectorStore.fromDocuments(
          texts,
          togetherAiEmbeddings,
          astraConfig
        );

        console.log("Initialized vector store:", vectorStore); // ! Debugging

        // Generate embeddings from the documents and store them.
        await vectorStore.addDocuments(texts);

        console.log("Documents added to vector store"); // ! Debugging
        return vectorStore;
      } catch (error) {
        console.error("Error initializing vector store:", error);
        throw error;
      }
    })();
  }
  return vectorStorePromise;
}
