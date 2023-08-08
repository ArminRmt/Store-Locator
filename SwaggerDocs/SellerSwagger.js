/**
 * @swagger
 * /sellers:
 *   get:
 *     summary: Get all sellers
 *     description: Retrieve a list of all sellers.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sellers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/seller'
 *       403:
 *         description: Access denied. Requires admin role.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /seller/{id}:
 *   get:
 *     summary: Get a seller by ID
 *     description: Retrieve a seller by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seller to retrieve.
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The seller with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 full_name:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 password:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: 1
 *               full_name: "armin"
 *               phone: "9876543210"
 *               password: "$argon2id....."
 *               createdAt: "2023-07-29T17:38:46.185Z"
 *               updatedAt: "2023-07-29T17:38:46.185Z"
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
 * /seller/{id}:
 *   patch:
 *     summary: Update a seller by ID
 *     description: Update a seller's information by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seller to update.
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
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Seller Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Seller Updated"
 *       400:
 *         description: Bad Request - invalid request data
 *       401:
 *         description: Unauthorized - invalid token or not authorized to update Seller
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
 *         description: Seller Not found.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /seller/{id}:
 *   delete:
 *     summary: Delete a seller by ID
 *     description: Delete a seller by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seller to delete.
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
 *         description: Seller deleted successfully
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
 *         description: Seller Not found.
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /GetSellerByToken:
 *   get:
 *     summary: Get seller by token
 *     description: Retrieve seller information based on the provided token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     responses:
 *       200:
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 full_name:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 password:
 *                   type: string
 *                 verificationCode:
 *                   type: string
 *                 verificationCodeExpiresAt:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: 1
 *               full_name: "armin"
 *               phone: "9876543210"
 *               password: "$argon2id....."
 *               verificationCode: "null"
 *               verificationCodeExpiresAt: "null"
 *               createdAt: "2023-07-29T17:38:46.185Z"
 *               updatedAt: "2023-07-29T17:38:46.185Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "توکن غیر معتبر است"
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
 * /GetSellerResponds:
 *   get:
 *     summary: Get seller responds
 *     description: Retrieve responds related to the authenticated seller.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     responses:
 *       200:
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Respond'
 *       401:
 *         description: Unauthorized
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
 *
 * components:
 *   schemas:
 *     SellerResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         seller_id:
 *           type: integer
 *         request_id:
 *           type: string
 *         price:
 *           type: string
 *         type:
 *           type: string
 *         timestamp:
 *           type: string
 *     Respond:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         seller_id:
 *           type: integer
 *         request_id:
 *           type: integer
 *         price:
 *           type: string
 *           format: float
 *         type:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
