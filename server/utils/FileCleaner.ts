import fs from "fs";
import path from "path";
import { server } from "..";

const FILE_PATH = "../sample"; // ! take note of the relative path
const sampleFolderPath = path.join(__dirname, FILE_PATH);

function removeFilesInSampleFolder() {
  fs.access(sampleFolderPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`Directory does not exist: ${sampleFolderPath}`);
      return;
    }

    fs.readdir(sampleFolderPath, (err, files) => {
      if (err) {
        console.error(`Error reading directory: ${err.message}`);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(sampleFolderPath, file);
        const fileExtension = path.extname(file).toLowerCase();

        if ([".pdf", ".csv", ".txt"].includes(fileExtension)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${filePath}: ${err.message}`);
            } else {
              console.log(`Deleted file ${filePath}`);
            }
          });
        }
      });
    });
  });
}

export const FileCleaner = {
  init: () => {
    function handleServerClose() {
      console.warn("Server is closing...");
      removeFilesInSampleFolder();

      server.close(() => {
        console.warn("Server closed");
      });
    }

    process.on("SIGTERM", handleServerClose);
    process.on("SIGINT", handleServerClose);
  },
};
