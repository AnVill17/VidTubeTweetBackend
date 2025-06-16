import { healthcheck } from "../controllers/healthcheck.js";
import { Router } from "express";
const router= Router()
router.route("/").get(healthcheck)
export default router
