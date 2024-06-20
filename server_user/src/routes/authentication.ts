import express from "express";
import {login, register} from "../controllers/authentication"
const router = express.Router();
import { ValidationMiddleware } from "../middleware/validation";
import { registerValidationSchema } from "../validations/schemas";

router.post('/login', login);
router.post('/register', ValidationMiddleware(registerValidationSchema), register);

export default router;