import express from "express";
import {login, register} from "../controllers/authentication"
const router = express.Router();
import { ValidationMiddleware } from "../middlewares/validation";
import { registerValidationSchema } from "../validations/schemas";
import { loginValidationSchema } from "../validations/schemas";

/**
 * tags:
 *  name: Authentication
 *  description: Endpoints to aunthenticate the user
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *      tags: [Authentication]
 *      summary: Login the user
 *      security: []
 *      requestBody:
 *          name: body
 *          description: User's email and password
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Returns access token used to authenticate the user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              token: 
 *                                  type: string
 *                                  description: access token to authenticate other pages
 *          401:
 *              description: User not registered
 *          400:
 *              description: Incorrect email or password
 */
router.post('/login', ValidationMiddleware(loginValidationSchema), login);
router.post('/register', ValidationMiddleware(registerValidationSchema), register);

export default router;