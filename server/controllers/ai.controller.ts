import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { extractPfData } from "../utils/pdfParser";
import { chatWithAI } from "../utils/chatWithAi";

export const ChatwithPdf = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const retriever = await extractPfData();
    const aiResponse = await chatWithAI(text, retriever);
    return res.status(StatusCodes.CREATED).json({
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
