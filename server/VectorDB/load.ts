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
dotenv.config();

const FILE_PATH = "./sample";
const TOGETHER_AI_API_KEY = process.env.TOGETHER_AI_API_KEY;

const togetherAiEmbeddings = new TogetherAIEmbeddings({
  apiKey: TOGETHER_AI_API_KEY as string,
  model: "togethercomputer/m2-bert-80M-8k-retrieval", // Default
  batchSize: 512,
});

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

// load_docs().catch(console.error);

let vectorStorePromise: Promise<AstraDBVectorStore> | null = null;

export async function getVectorStore() {
  if (!vectorStorePromise) {
    vectorStorePromise = (async () => {
      try {
        const texts = await load_docs();
        console.log("Loaded documents:", texts); // ! Debugging

        // Specify the database and collection to use.
        // If the collection does not exist, it is created automatically.
        const astraConfig: AstraLibArgs = {
          token: process.env.ASTRA_DB_APPLICATION_TOKEN as string,
          endpoint: process.env.ASTRA_DB_API_ENDPOINT as string,
          namespace: process.env.ASTRA_DB_NAMESPACE as string,
          collection: process.env.ASTRA_DB_COLLECTION ?? "vector_test",
          collectionOptions: {
            vector: {
              dimension: 1536,
              metric: "cosine",
            },
          },
        };
        console.log(astraConfig); // ! Debugging

        // Initialize the vector store.
        const vectorStore = await AstraDBVectorStore.fromDocuments(
          texts,
          togetherAiEmbeddings,
          astraConfig
        );

        console.log("Initialized vector store:", vectorStore); // ! Debugging

        // Generate embeddings from the documents and store them.
        await vectorStore.addDocuments(texts);
        console.log(vectorStore); // ! Debugging
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
