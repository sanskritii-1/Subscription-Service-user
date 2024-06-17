import { getResources, accessResource } from "../controllers/resources";
import express from "express";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get('/get-resources', authMiddleware, getResources);
router.post('/access-resource', authMiddleware, accessResource);

export default router;