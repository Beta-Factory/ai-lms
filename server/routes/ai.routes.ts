import { Router } from "express";
import { trainDocs } from "../controllers/ai.controller";
import { AIChat } from "../controllers/ai.controller";
import { deleteCollection } from "../utils/MemoryDeletion";

const router = Router();

router.get("/train", trainDocs);
router.post("/chat", AIChat);
router.delete("/mem-wipe", deleteCollection);

export default router;
