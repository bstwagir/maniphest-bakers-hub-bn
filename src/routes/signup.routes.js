import express from 'express';
import { createUser } from '../controllers/signup.controller';

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              properties:
 *                  firstname:
 *                      type: string
 *                  lastname:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 */

/**
 * @swagger
 * /api/register:
 *  post:
 *      summary: registering a user
 *      description: This api is used to register a user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/User'
 *      responses:
 *          200:
 *              description: This api is used to register a user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/User'
 */

// Create a new User
router.post('/register', createUser);

export default router;