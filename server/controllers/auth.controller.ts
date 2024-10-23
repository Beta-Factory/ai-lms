import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PassportRequest } from "../utils/helpers";

export const registerUser = async (req: PassportRequest, res: Response) => {
  try {
    const { user, passportInternalErr, passportauthErr } = req;

    if (passportauthErr || passportInternalErr) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Registration failed",
        error: passportauthErr || passportInternalErr,
      });
    }

    console.log("session", req.session);

    return res.status(StatusCodes.OK).json({
      message: "success",
      user,
    });
  } catch (error: any | unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Sign Up failed",
      error: error.message,
    });
  }
};

export const loginUser = async (req: PassportRequest, res: Response) => {
  try {
    const { user, passportInternalErr, passportauthErr } = req;

    if (passportauthErr || passportInternalErr) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Authentication failed",
        error: passportauthErr || passportInternalErr,
      });
    }

    console.log("session", req.session);

    return res.status(StatusCodes.OK).json({
      message: "success user logged in",
      user,
    });
  } catch (error: any | unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const logoutUser = (req: PassportRequest, res: Response) => {
  console.log("user", req.user);
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
