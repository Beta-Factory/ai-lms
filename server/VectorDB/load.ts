import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { OpenAIEmbeddings } from "@langchain/openai";
import {
  AstraDBVectorStore,
  AstraLibArgs,
} from "@langchain/community/vectorstores/astradb";
import { TogetherAIEmbeddings } from "@langchain/community/embeddings/togetherai";

const embeddings = new TogetherAIEmbeddings({
  model: "togethercomputer/m2-bert-80M-8k-retrieval", // Default value
});

const FILE_PATH = "../sample";
const TOGETHER_AI_API_KEY = process.env["TOGETHER_AI_API_KEY"];

async function load_docs() {
  const loader = new DirectoryLoader(FILE_PATH, {
    ".txt": (path) => new TextLoader(path),
  });
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 15,
  });

  const texts = await splitter.splitDocuments(docs);
  console.log("Loaded ", texts.length, " documents.");
  return texts;
}

load_docs().catch(console.error);
