import fs from "fs/promises";
import { Response } from "express";
import { cleanupFiles, combineDocs, CustomRequest } from "../utils/helpers";
import { StatusCodes } from "http-status-codes";
import {
  chatWithAiWithOutVectorRetrieval,
  chatWithAIWithVectorRetrieval,
} from "../utils/chatWithAi";
import { obtainRetrieverOfExistingVectorDb } from "../utils/uploadOrGetVectorDb";
import { extractMultiFileData } from "../utils/multiFileLoader";
import { Agent } from "../models/agent.model";
import { s3Client } from "../utils/awsS3";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Chat } from "../models/chat.model";
import { generateChatName } from "../utils/generateChatName";
import { Conversation } from "../models/conversation.model";
import { mongoIdType } from "../types/mongooseTypes";
import { checkTableExists } from "../utils/keys";
import { audioTranscription } from "../utils/audioProcessing";

const bucketName = process.env.AWS_BUCKETNAME || "";

export const createAgent = async (req: CustomRequest, res: Response) => {
  try {
    const {
      body: { context, description, agentName },
      files,
      user,
    } = req;

    let agentPic,
      trainFiles: any = [];
    let agentPicUrl = "";
    let trainingFilesUrls: string[] = [];

    if (files && !(files instanceof Array)) {
      agentPic = files["agentPic"]?.[0];
      trainFiles = files["trainFiles"];
    }

    const filepathsArray = Array.isArray(trainFiles)
      ? trainFiles.map((file) => `${file.destination}${file.filename}`)
      : [];

    const emailUsername = (user?.email as unknown as string).split("@")[0];
    const uniqueAgentName = `${agentName}_${emailUsername}`;

    const doesAgentExist = await Agent.findOne({
      agentName: uniqueAgentName,
      creatorId: user?._id,
    });
    if (doesAgentExist) {
      await cleanupFiles(filepathsArray, agentPic);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "failed",
        error: "Agent with this name already exists. Pick something else!",
      });
    }

    const uploadPromises = [];

    if (filepathsArray.length > 0) {
      uploadPromises.push(
        ...filepathsArray.map(async (filePath, index) => {
          const fileContent = await fs.readFile(filePath);
          const fileName = `training-files/${trainFiles[index].filename}`;
          const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: fileContent,
          };
          await s3Client.send(new PutObjectCommand(params));
          const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
          trainingFilesUrls.push(fileUrl);
        })
      );
    }

    if (agentPic) {
      const agentPicContent = await fs.readFile(
        `${agentPic.destination}${agentPic.filename}`
      );
      const agentPicName = `app-data/${agentPic.filename}`;
      const params = {
        Bucket: bucketName,
        Key: agentPicName,
        Body: agentPicContent,
      };
      uploadPromises.push(s3Client.send(new PutObjectCommand(params)));
      agentPicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${agentPicName}`;
    }

    await Promise.all(uploadPromises);

    if (filepathsArray && filepathsArray.length !== 0)
      await extractMultiFileData(filepathsArray, uniqueAgentName);

    await Agent.create({
      creatorId: user?._id,
      context,
      description,
      agentName: uniqueAgentName,
      agentPic: agentPicUrl,
      trainingFiles: trainingFilesUrls,
    });

    await cleanupFiles(filepathsArray, agentPic);

    return res.status(StatusCodes.CREATED).json({
      message: "success",
    });
  } catch (error) {
    console.error("Error during agent creation:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "failed",
      error,
    });
  }
};

export const getListOfAllAgents = async (req: CustomRequest, res: Response) => {
  try {
    const { user } = req;
    console.log("user", user);
    const allUserAgents = await Agent.find({
      creatorId: user?._id,
    });
    const cleanedUserAgents =
      allUserAgents.length > 0
        ? allUserAgents.map((agent) => {
            return {
              context: agent.context,
              description: agent.description,
              agentPic: agent.agentPic,
              trainingFiles: agent.trainingFiles,
              agentName: agent.agentName.split("_")[0],
            };
          })
        : [];
    return res.status(StatusCodes.OK).json({
      message: "success",
      response: cleanedUserAgents,
    });
  } catch (error) {
    console.log("Error fetching All User agents", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "failed",
      error,
    });
  }
};

export const EditAIAgent = async (req: CustomRequest, res: Response) => {
  try {
    const {
      body: { description, context },
      files,
      user,
      params: { agentId },
    } = req;

    let agentPic, agentPicUrl;

    if (files && !(files instanceof Array)) {
      agentPic = files["agentPic"]?.[0];
    }

    const foundAgent = await Agent.findByIdAndUpdate(agentId);
    if (!foundAgent) {
      await cleanupFiles(
        agentPic ? [`${agentPic.destination}${agentPic.filename}`] : []
      );
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "failed",
        error: "No agent with the provided name has been found",
      });
    }

    const uploadPromises = [];

    if (agentPic) {
      const agentPicContent = await fs.readFile(
        `${agentPic.destination}${agentPic.filename}`
      );
      const agentPicName = `app-data/${agentPic.filename}`;
      const params = {
        Bucket: bucketName,
        Key: agentPicName,
        Body: agentPicContent,
      };
      uploadPromises.push(s3Client.send(new PutObjectCommand(params)));
      agentPicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${agentPicName}`;

      if (foundAgent && foundAgent.agentPic) {
        const oldAgentPicKey = foundAgent.agentPic.split(".com/")[1];
        const deleteParams = {
          Bucket: bucketName,
          Key: oldAgentPicKey,
        };
        await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log(`Deleted previous agentPic from S3: ${oldAgentPicKey}`);
      }
    } else {
      agentPicUrl = foundAgent?.agentPic || "";
    }

    await Promise.all(uploadPromises);

    foundAgent.context = context;
    foundAgent.description = description;
    foundAgent.agentPic = agentPicUrl;
    await foundAgent.save();

    await cleanupFiles(
      agentPic ? [`${agentPic.destination}${agentPic.filename}`] : []
    );

    return res.status(StatusCodes.OK).json({
      message: "success",
      response: foundAgent,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.OK).json({
      message: "failed",
      error,
    });
  }
};

export const chatWIthAIAgent = async (req: CustomRequest, res: Response) => {
  try {
    const {
      body: { userInput },
      files,
      user,
      params: { agentId, chatId },
    } = req;

    let chatFiles, transcribedText, extractedChatData;

    if (files && !(files instanceof Array)) {
      const fileFields = files as {
        [fieldname: string]: Express.Multer.File[];
      };

      if (fileFields["chatFiles"]) {
        chatFiles = fileFields["chatFiles"];
        const filepathsArray = Array.isArray(chatFiles)
          ? chatFiles.map((file) => `${file.destination}${file.filename}`)
          : [];
        const chatOutputData = await extractMultiFileData(filepathsArray);
        extractedChatData = combineDocs(chatOutputData);
        await cleanupFiles(filepathsArray);
      } else {
        extractedChatData = "no data from chat";
      }

      if (fileFields["voiceMessage"]) {
        const voiceMessage = fileFields["voiceMessage"][0];
        const voiceMessagePath = `${voiceMessage.destination}${voiceMessage.filename}`;

        transcribedText = await audioTranscription(voiceMessagePath);
        await cleanupFiles([voiceMessagePath]);
      } else {
        transcribedText = "no voice message provided";
      }
    } else {
      extractedChatData = "no data from chat";
      transcribedText = "no voice message provided";
    }

    console.log("transcribed text", transcribedText);

    if (!userInput && transcribedText === "no voice message provided") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "failed",
        error: "no input from user",
      });
    }

    const foundAgent = await Agent.findById(agentId);
    if (!foundAgent) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "failed",
        error: "No agent with the provided name has been found",
      });
    }

    let chatsByUserWithFoundAgent: {
      _id?: mongoIdType;
      user: string;
      system: string;
    }[] = [];

    if (chatId) {
      chatsByUserWithFoundAgent = await Conversation.find({
        chatId,
      })
        .select("user")
        .select("system");
    } else {
      chatsByUserWithFoundAgent = [];
    }

    const foundChats =
      chatsByUserWithFoundAgent && chatsByUserWithFoundAgent.length > 0
        ? chatsByUserWithFoundAgent?.map(
            (convo: { user: string; system: string }) => {
              return {
                human: convo.user || "",
                ai: convo.system || "",
              };
            }
          )
        : [{ human: "", ai: "" }];

    let aiResponse: string = "";
    const collectionName = foundAgent.agentName;
    const tableExists = await checkTableExists(collectionName);
    if (!tableExists) {
      aiResponse = await chatWithAiWithOutVectorRetrieval(
        transcribedText !== "no voice message provided"
          ? transcribedText
          : userInput,
        foundAgent.agentName.split("_")[0],
        foundAgent.context,
        foundChats,
        extractedChatData
      );
    } else {
      const retriever = await obtainRetrieverOfExistingVectorDb(collectionName);
      aiResponse = await chatWithAIWithVectorRetrieval(
        transcribedText !== "no voice message provided"
          ? transcribedText
          : userInput,
        foundAgent.agentName.split("_")[0],
        retriever,
        foundAgent.context,
        foundChats,
        extractedChatData
      );
    }

    if (!chatId) {
      const chatName = await generateChatName(userInput, aiResponse);

      const chat = await Chat.create({
        userId: user?._id,
        agentId: foundAgent._id,
        chatName,
      });

      await Conversation.create({
        userId: user?._id,
        agentId: foundAgent._id,
        chatId: chat?._id,
        user:
          transcribedText !== "no voice message provided"
            ? transcribedText
            : userInput,
        system: aiResponse,
      });
    } else {
      await Conversation.create({
        userId: user?._id,
        agentId: foundAgent._id,
        chatId,
        user:
          transcribedText !== "no voice message provided"
            ? transcribedText
            : userInput,
        system: aiResponse,
      });
    }

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
