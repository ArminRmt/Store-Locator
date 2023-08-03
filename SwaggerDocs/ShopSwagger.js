/**
 * @swagger
 * /shops:
 *   get:
 *     summary: Get all shops
 *     description: Retrieve a list of all shops.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     responses:
 *       200:
 *         description: A list of shops.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/shop'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Require Admin Role! - No token provided!
 *       404:
 *         description: User Not found.
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /shop/{id}:
 *   get:
 *     summary: Get shop by ID
 *     description: Retrieve a shop by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shop to retrieve.
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     responses:
 *       200:
 *         description: A shop object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/shop'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only the owner or admin has this access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Only the owner or admin has this access"
 *       404:
 *         description: User Not found.
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /shop/{id}:
 *   patch:
 *     summary: Update shop by ID
 *     description: Update a shop's information by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shop to update.
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seller_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               bio:
 *                 type: string
 *               address:
 *                 type: string
 *               open_time:
 *                 type: string
 *               avg_rating:
 *                 type: number
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Shop updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request - invalid request data
 *       401:
 *         description: Unauthorized - invalid token or not authorized to update shop
 *       403:
 *         description: Forbidden - only the owner or admin has this access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Only the owner or admin has this access"
 *       404:
 *         description: Shop Not found.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/create:
 *   post:
 *     summary: Create shop by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shop to update.
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seller_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               bio:
 *                 type: string
 *               address:
 *                 type: string
 *               open_time:
 *                 type: string
 *               avg_rating:
 *                 type: number
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       2001:
 *         description: Shop Created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Please provide all required fields.
 *       401:
 *         description: Unauthorized - invalid token or not authorized to Create shop
 *       403:
 *         description: Forbidden - only the owner or admin has this access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Only the owner or admin has this access"
 *       404:
 *         description: Useer Not found.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /shop/{id}:
 *   delete:
 *     summary: Delete shop by ID
 *     description: Delete a shop by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the shop to delete.
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     responses:
 *       200:
 *         description: Shop deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only the owner or admin has this access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Only the owner or admin has this access"
 *       404:
 *         description: User Not found.
 *       500:
 *         description: Internal Server Error
 */
