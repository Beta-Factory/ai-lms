import fs from "fs";
import { promisify } from "util";
import { Request, Response } from "express";
import { CustomRequest } from "../utils/helpers";
import { StatusCodes } from "http-status-codes";
import { chatWithAI } from "../utils/chatWithAi";
import { obtainRetrieverOfExistingVectorDb } from "../utils/uploadOrGetVectorDb";
import { extractMultiFileData } from "../utils/multiFileLoader";
import { Agent } from "../models/agent.model";

const unlinkAsync = promisify(fs.unlink);

export const creatAgent = async (req: CustomRequest, res: Response) => {
  try {
    const {
      body: { context, description, agentName },
      files,
      user,
    } = req;

    let agentPic, trainFiles;

    if (files && !(files instanceof Array)) {
      agentPic = files["agentPic"]?.[0];
      trainFiles = files["trainFiles"];
    }

    const filepathsArray = Array.isArray(trainFiles)
      ? trainFiles.map((file) => `${file.destination}${file.filename}`)
      : [];

    // await extractMultiFileData(filepathsArray);

    await Promise.all(
      filepathsArray.map(async (filePath) => {
        try {
          await unlinkAsync(filePath);
          console.log(`File ${filePath} deleted successfully.`);
        } catch (err) {
          console.error(`Error deleting file ${filePath}:`, err);
        }
      })
    );

    if (agentPic) {
      await unlinkAsync(`${agentPic.destination}${agentPic.filename}`);
    }

    await Agent.create({
      creatorId: user?._id,
      context,
      description,
      agentName,
    });

    return res.status(StatusCodes.CREATED).json({
      message: "success",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.OK).json({
      message: "failed",
      error,
    });
  }
};

export const chatWIthAIAgent = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    console.log("body", req.body);
    const retriever = await obtainRetrieverOfExistingVectorDb();
    const aiResponse = await chatWithAI(text, retriever);
    return res.status(StatusCodes.OK).json({
      message: "success",
      response: aiResponse,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.OK).json({
      message: "failed",
      error,
    });
  }
};
