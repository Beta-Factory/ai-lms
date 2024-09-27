import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import dotenv from "dotenv";
dotenv.config();
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import * as fs from "fs";
import { defaultChunkOverlap, defaultChunkSize } from "./keys";
import { getInitials, shortenString } from "./fileNameMaker";

// ? ============== variables =====================.
export let textLength: number = 0;
const FILE_PATH = "./training-data"; // ! take note of the relative path
export let VectoreStoreFileName: string = "default_vector_store";

let userName = "default"; // ! replace with hashed username from mongodb

// ? ==============types=====================.
type LoaderFunction = (path: string) => any;
interface LoadersMap {
  [key: string]: LoaderFunction;
}

export async function load_docs() {
  const files = fs.readdirSync(FILE_PATH) as string[];
  console.log(files); // ! Debugging
  let loader;
  let loadersMap: LoadersMap = {};

  try {
    if (files.length === 0) {
      return null;
    }

    //loader map for all file types
    files.forEach((file) => {
      const filePath = `${FILE_PATH}/${file}`;
      const stats = fs.statSync(filePath);
      const fileEditTime = stats.mtime
        .toISOString()
        .replace(/[^a-zA-Z0-9_]/g, "_");

      let fileInitialsPlusTime =
        getInitials(file.replace(/\.[^/.]+$/, "")) + fileEditTime;

      fileInitialsPlusTime = shortenString(fileInitialsPlusTime, 47);

      if (file.endsWith(".txt")) {
        VectoreStoreFileName = `${fileInitialsPlusTime}_TXT`;
        loadersMap[".txt"] = (path) => new TextLoader(path);
      } else if (file.endsWith(".pdf")) {
        VectoreStoreFileName = `${fileInitialsPlusTime}_PDF`;
        loadersMap[".pdf"] = (path) => new PDFLoader(path);
      } else if (file.endsWith(".csv")) {
        VectoreStoreFileName = `${fileInitialsPlusTime}_CSV`;
        loadersMap[".csv"] = (path) => new CSVLoader(path);
      }
    });
    console.log("Loading : ", loadersMap); // ! Debugging

    // Sanitize the fileName to match the required pattern
    const sanitizedFileName = VectoreStoreFileName.replace(
      /[^a-zA-Z0-9_]/g,
      "x"
    );
    if (!/^[a-zA-Z]/.test(sanitizedFileName)) {
      throw new Error("Sanitized file name must start with a letter.");
    }
    VectoreStoreFileName = sanitizedFileName;

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

    console.log("fileName : ", VectoreStoreFileName); // ! Debugging
    textLength = texts.length;
    return texts;
  } catch (error: Error | any) {
    console.error("Error loading documents:", error.message);
    throw error;
  }
}

load_docs().catch((error) => {
  console.error("Error loading documents:", error.message);
});
