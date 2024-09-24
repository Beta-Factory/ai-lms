import { Router } from "express";
import { trainPdf } from "../controllers/ai.controller";
import { AIChat } from "../LangChain/Chat";
import { deleteCollection } from "../utils/MemoryDeletion";

const router = Router();

router.post("/chat", AIChat);
router.delete("/mem-wipe", deleteCollection);

export default router;
