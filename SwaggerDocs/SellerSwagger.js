/**
 * @swagger
 * /updateSeller:
 *   patch:
 *     summary: Update Seller
 *     description: Update seller information, including full name, phone number, and password.
 *     security:
 *       - bearerAuth: []
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
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
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
 *               msg: "فروشنده به‌روزرسانی شد"
 *       400:
 *         description: Bad Request - invalid request data
 *       401:
 *         description: Unauthorized - invalid token or not authorized to update Seller
 *       404:
 *         description: Seller Not Found or Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "فروشنده پیدا نشد یا شما مجوز به‌روزرسانی ندارید"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "خطای سرور داخلی"
 */
/**
 * @swagger
 * /SellerRequests:
 *   get:
 *     summary: Get Seller's Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requests:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                     $ref: '#/components/schemas/request'
 *                 totalPages:
 *                   type: integer
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "هیچ درخواست فروشنده‌ای یافت نشد"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "خطای داخلی سرور"
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
 *       '200':
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
 *                 shop_id:
 *                   type: integer
 *             example:
 *               id: 1
 *               full_name: "armin"
 *               phone: "9876543210"
 *               password: "$argon2id....."
 *               shop_id: 1
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "توکن غیر معتبر است"
 *       '500':
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
