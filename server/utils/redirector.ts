import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const RedirectMeBaby = (req: Request, res: Response) => {
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};

export default RedirectMeBaby;
