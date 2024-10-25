import mongoose from "mongoose";
import { mongoId, mongoString } from "../types/mongooseTypes";

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: mongoString,
      required: false,
      default: "",
    },
    organizationId: {
      type: mongoId,
      ref: "Organization",
      required: false,
      default: null,
    },
    email: {
      type: mongoString,
      required: true,
      unique: true,
    },
    firstName: {
      type: mongoString,
      required: true,
    },
    lastName: {
      type: mongoString,
      required: true,
    },
    password: {
      type: mongoString,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
