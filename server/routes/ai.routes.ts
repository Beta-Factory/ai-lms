import { Router } from "express";
import { trainPdf } from "../controllers/ai.controller";
import { AIChat } from "../LangChain/Chat";

const router = Router();

router.post("/chat", AIChat);

export default router;
