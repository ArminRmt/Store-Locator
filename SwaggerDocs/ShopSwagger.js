/**
 * @swagger
 * /getShops:
 *   get:
 *     summary: Get seller all shops
 *     description: Retrieve a seller all shops
 *     tags:
 *       - Shops
 *     parameters:
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
 *                 error:
 *                   type: string
 *             example:
 *               error: "Only the owner or admin has this access"
 *       404:
 *         description: User Not found.
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /getSellerShop/{id}:
 *   get:
 *     summary: Get Seller's Shop by ID
 *     description: Retrieve the shop information of a seller by their ID.
 *     tags:
 *       - Shops
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the seller for whom you want to retrieve the shop information.
 *     responses:
 *       200:
 *         description: A shop object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/shop'
 *       404:
 *         description: Seller Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seller not found."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "خطای سرور داخلی"
 */
/**
 * @swagger
 * /createShop:
 *   post:
 *     summary: Create shop by ID
 *     tags:
 *       - Shops
 *     parameters:
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
 *                 error:
 *                   type: string
 *             example:
 *               error: "Only the owner or admin has this access"
 *       404:
 *         description: Useer Not found.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /updateShop:
 *   patch:
 *     summary: Update shop by ID
 *     description: Update a shop's information by its ID.
 *     tags:
 *       - Shops
 *     parameters:
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
 *                 msg:
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
 *                 error:
 *                   type: string
 *             example:
 *               error: "Only the owner or admin has this access"
 *       404:
 *         description: Shop Not found.
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /shopDelete:
 *   delete:
 *     summary: Delete shop by ID
 *     description: Delete a shop by its ID.
 *     tags:
 *       - Shops
 *     parameters:
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
 *     responses:
 *       200:
 *         description: Shop deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
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
 *                 error:
 *                   type: string
 *             example:
 *               error: "Only the owner or admin has this access"
 *       404:
 *         description: User Not found.
 *       500:
 *         description: Internal Server Error
 */
