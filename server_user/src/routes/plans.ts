import { allPlans } from "../controllers/plans";
import express from "express";

const router = express.Router();

router.get('/subscription-plans', allPlans);

export default router;