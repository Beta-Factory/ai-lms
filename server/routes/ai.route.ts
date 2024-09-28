import { Router } from "express";
import { chatWIthAIAgent, ChatwithPdf } from "../controllers/ai.controller";
import upload from "../middlewares/multerConfig";

const router = Router();

router.post("/train", upload.single("file"), ChatwithPdf);
router.post("/chat", upload.none(), chatWIthAIAgent);

export default router;
