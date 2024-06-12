import express from "express";
import {refresh, register} from "../controllers/authentication"
const router = express.Router();

// router.post('/login', login);
router.post('/register', register);
router.get('/refresh', refresh);

export default router;