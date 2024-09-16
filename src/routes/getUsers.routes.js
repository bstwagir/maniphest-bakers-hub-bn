import express from 'express';
import fetchAllUsers from '../controllers/getUsers.controller';
//import { authorizeAdmin } from '../middlewares/userRoles.middleware';

const router = express.Router();

// get all Users

/**
 * @swagger
 * /api/fetchUsers:
 *  get:
 *      summary: get a list of items as a customer
 *      description: This api is used to get a list of items as a customer
 *      parameters:
 *        - in: query
 *          name: page
 *          description: page number to retrieve, default is 1
 *          schema:
 *              type: integer
 *        - in: query
 *          name: size
 *          description: number of items per page to retrieve, default is 5
 *          schema:
 *              type: integer
 *      tags:
 *        - get a list of items
 *      responses:
 *          200:
 *              description: This api is used to get a list of available items as a customer
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/Product'
 */

router.get('/fetchUsers', fetchAllUsers);

export default router;