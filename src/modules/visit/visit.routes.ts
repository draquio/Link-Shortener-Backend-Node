import { Router } from "express";
import { visitController } from "./visit.instance";
const router = Router();

router.get("/:shortcode", visitController.processVisit.bind(visitController));

export default router;