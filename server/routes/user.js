/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - displayName
 *       properties:
 *         username:
 *           type: string
 *           description: username of user
 *         displayName:
 *           type: string
 *           description: display name of user
 *       example:
 *         username: Vinpool
 *         displayName: Vincent
 * 
 * /user: 
 *   get: 
 *     summary: get a user
 *     responses: 
 *       200: 
 *         description: got user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       304: 
 *         description: got user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
