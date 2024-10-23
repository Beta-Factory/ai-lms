import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// import passport from "passport";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;

    console.log("Authenticated user", user);
    return res.status(StatusCodes.CREATED).json({
      message: "success user created",
      user,
    });
  } catch (error) {
    console.log("error", error);

    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "failed to register user",
      error,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    console.log("Authenticated user", user);
    return res.status(StatusCodes.OK).json({
      message: "success user logged in",
      user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "failed user not found",
      error,
    });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      err: "No user in session",
    });
  }
  req.logout((err) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
};
