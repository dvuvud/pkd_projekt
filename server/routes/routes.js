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
 *     Message:
 *       type: object
 *       required:
 *         - id
 *         - content
 *         - recipient
 *         - sender
 *         - timestamp
 *       properties:
 *         id:
 *           type: string
 *           description: random ID
 *         content:
 *            type: string
 *            description: The message content
 *         recipient:
 *           type: string
 *           description: the recipient username
 *         sender:
 *           type: string
 *           description: the sender username
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
 *
 * /message: 
 *   post: 
 *     summary: send a message
 *     requestBody:
 *       description: Test
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Message"
 *     responses: 
 *       200: 
 *         description: sent message
 */
