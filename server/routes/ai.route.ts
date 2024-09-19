import { Router } from "express";
import { trainPdf } from "../controllers/ai.controller";

const router = Router();

router.post("/train", trainPdf);

export default router;
