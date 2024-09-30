import fs from "fs/promises";
import { Request, Response } from "express";
import { cleanupFiles, CustomRequest } from "../utils/helpers";
import { StatusCodes } from "http-status-codes";
import { chatWithAI } from "../utils/chatWithAi";
import { obtainRetrieverOfExistingVectorDb } from "../utils/uploadOrGetVectorDb";
import { extractMultiFileData } from "../utils/multiFileLoader";
import { Agent } from "../models/agent.model";
import { s3Client } from "../utils/awsS3";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const bucketName = process.env.AWS_BUCKETNAME || "";

export const creatAgent = async (req: CustomRequest, res: Response) => {
  try {
    const {
      body: { context, description, agentName },
      files,
      user,
    } = req;

    let agentPic, trainFiles: any;
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
      console.log("outside cleaning");
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
    const allUserAgents = await Agent.find({
      creatorId: user?._id,
    });
    return res.status(StatusCodes.OK).json({
      message: "success",
      response: allUserAgents,
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
      body: { agentName, description, context },
      files,
      user,
      params: { agentId },
    } = req;

    const emailUsername = (user?.email as unknown as string).split("@")[0];
    const uniqueAgentName = `${agentName}_${emailUsername}`;

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

    foundAgent.agentName = uniqueAgentName;
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

export const chatWIthAIAgent = async (req: Request, res: Response) => {
  try {
    const {
      body: { text, agentName },
      params: { agentId },
    } = req;
    const collectionName = agentName.split("_")[0];
    const foundAgent = await Agent.findById(agentId);
    if (!foundAgent) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "failed",
        error: "No agent with the provided name has been found",
      });
    }
    const retriever = await obtainRetrieverOfExistingVectorDb(collectionName);
    const aiResponse = await chatWithAI(text, retriever, foundAgent.context);
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
