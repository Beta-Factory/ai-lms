import mongoose from "mongoose";

//constants
export const mongoString = mongoose.Schema.Types.String;
export const mongoId = mongoose.Schema.Types.ObjectId;

//types
export type mongoIdType = mongoose.Schema.Types.ObjectId;
export type mongoStringType = mongoose.Schema.Types.String;
