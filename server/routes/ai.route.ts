import { Router } from "express";
import { ChatwithPdf } from "../controllers/ai.controller";

const router = Router();

router.post("/train", ChatwithPdf);

export default router;
