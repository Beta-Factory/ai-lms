import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import aiRoutes from "./routes/ai.routes";
import passport from "passport";
import { PORT, SESSION_SECRET } from "./utils/keys";

dotenv.config();
const app = express();

//MongoDb setup
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

//middlewares setup
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient() as any, // ! annotated as any cz it was giving weird type error
    }),
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

//routes setup
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ai", aiRoutes);

export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
