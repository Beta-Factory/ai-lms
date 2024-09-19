import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { extractPfData } from "../utils/pdfParser";

export const trainPdf = async (req: Request, res: Response) => {
  try {
    await extractPfData();
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
