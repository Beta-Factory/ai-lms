import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import dotenv from "dotenv";
dotenv.config();
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import * as fs from "fs";
import { getAiEmbeddings } from "./EmbeddingAI";
// import { DBchecker } from "../utils/DBchecker";
import { astraConfig } from "./DBconfig";
import { defaultChunkOverlap, defaultChunkSize } from "./keys";

// ? ==============Load the documents=====================.
export let textLength: number = 0;
const FILE_PATH = "./sample"; // ! take note of the relative path

type LoaderFunction = (path: string) => any;
interface LoadersMap {
  [key: string]: LoaderFunction;
}

async function load_docs() {
  const files = fs.readdirSync(FILE_PATH);
  let loader;
  let loadersMap: LoadersMap = {};

  try {
    if (files.length === 0) {
      return null;
    }

    //loader map for all file types
    files.forEach((file) => {
      if (file.endsWith(".txt")) {
        loadersMap[".txt"] = (path) => new TextLoader(path);
      } else if (file.endsWith(".pdf")) {
        loadersMap[".pdf"] = (path) => new PDFLoader(path);
      } else if (file.endsWith(".csv")) {
        loadersMap[".csv"] = (path) => new CSVLoader(path);
      }
    });

    if (Object.keys(loadersMap).length === 0) {
      throw new Error("No supported file types found!");
    }
    loader = new DirectoryLoader(FILE_PATH, loadersMap);

    const docs = (await loader.load()) as unknown as { pageContent: string }[];

    const docsToStringArray = docs.map(
      (doc: { pageContent: string }) => doc.pageContent
    );
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: defaultChunkSize,
      separators: ["\n\n", "\n", " ", ""],
      chunkOverlap: defaultChunkOverlap,
    });

    const texts = await splitter.createDocuments(docsToStringArray);
    // console.log(texts); // ! Debugging
    console.log("Loaded ", texts.length, " documents."); // ! Debugging
    textLength = texts.length;
    return texts;
  } catch (error) {
    console.error("Error loading documents:", error);
    throw error;
  }
}

export let vectorStorePromise: Promise<AstraDBVectorStore> | null = null;
export async function getVectorStore() {
  if (!vectorStorePromise) {
    vectorStorePromise = (async () => {
      try {
        const documents = await load_docs();
        if (!documents || documents.length === 0) {
          console.warn("No documents to process....");
        }

        // ? ==============Initialize the vector store=====================.
        const vectorStore = await AstraDBVectorStore.fromExistingIndex(
          getAiEmbeddings(textLength),
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
