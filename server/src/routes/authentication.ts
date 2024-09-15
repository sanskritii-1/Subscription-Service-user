import express from "express";
import {login, register} from "../controllers/authentication"
const router = express.Router();
import { ValidationMiddleware } from "../middlewares/validation";
import { registerValidationSchema } from "../validations/schemas";
import { loginValidationSchema } from "../validations/schemas";
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/login', ValidationMiddleware(loginValidationSchema), login);
router.post('/register', ValidationMiddleware(registerValidationSchema), register);

export default router;