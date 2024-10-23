import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/user.model";
import {
  comparePassword,
  deserializeUser,
  hashPassword,
  serializeUser,
} from "../utils/helpers";

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use(
  "local-login",
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const findUser = await User.findOne({ email });
        if (!findUser) {
          return done(null, false, { message: "User not found" });
        }
        if (
          findUser.password &&
          !comparePassword(password, findUser.password)
        ) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, findUser);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  "local-signup",
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.warn("existingUser", existingUser); // ! debug

          return done(null, false, { message: "Email already registered" });
        }

        console.warn("email", email); // ! debug
        console.warn("password", password); // ! debug

        const newUser = new User({
          email,
          password: hashPassword(password),
        });

        console.warn("newUser", newUser); // ! debug

        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(null, false, { message: (error as Error).message });
      }
    }
  )
);

export { passport };
