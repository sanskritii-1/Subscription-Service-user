import { getResources, accessResource } from "../controllers/resource";
import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { ValidationMiddleware } from "../middlewares/validation";
import { accessResourceValidationSchema } from "../validations/schemas";

const router = express.Router();
/**
 * @swagger 
 * tags:
 *  name: Resource
 *  description: Endpoints to access resources
 */

/**
 * @swagger
 * /api/get-resources:
 *  get:
 *      tags: [Resource]
 *      summary: Get all the blurred resources
 *      responses:
 *          400:
 *              description: Not subscribed to a plan
 *          404:
 *              description: User record in UserResource table not found
 *          200:
 *              description: list of all accessible and inaccessible resources
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Resource'
 */
router.get('/get-resources', authMiddleware, getResources);

/**
 * @swagger
 * /api/access-resource:
 *  post:
 *      summary: returns the un-blurred url of the resource the user wants to access
 *      tags: [Resource]
 *      requestBody:
 *          name: imageId
 *          description: id of the resource the user wants to access
 *          content: 
 *              application/json: 
 *                  schema:
 *                      type: object
 *                      properties:
 *                          imageId: 
 *                              type: string
 *      responses:
 *          400:
 *              description: Accessing a resource that is not in the plan
 *          403:
 *              description: Number of accesses to the resource is used up
 *          404:
 *              description: Either user's transaction record for the plan is not found or the resource is not found
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              url:
 *                                  type: string
 *                                  description: The url of the un-blurred resource
 */
router.post('/access-resource', ValidationMiddleware(accessResourceValidationSchema), authMiddleware, accessResource);

export default router;