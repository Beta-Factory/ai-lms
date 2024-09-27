import bcrypt from "bcrypt";

import { userType } from "../types/userTypes";
import { User } from "../models/user.model";

const saltRounds = 10;

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string) =>
  bcrypt.compareSync(plain, hashed);

export const serializeUser = (
  user: userType,
  done: (err: any, id?: unknown) => void
) => {
  done(null, user._id);
};

export const deserializeUser = async (
  id: unknown,
  done: (err: any, id?: unknown) => void
) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
};

// ! to be run only first time when user is created
export async function hashName(userName: string) {
  const saltRounds = 6;
  try {
    const hash = await bcrypt.hash(userName, saltRounds);
    return hash.substring(0, 5);
  } catch (error) {
    console.error("Error hashing user-Name:", error);
  }
}
