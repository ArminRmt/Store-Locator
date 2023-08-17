/**
 * @swagger
 * /SellerResponds:
 *   get:
 *     summary: Get seller responds
 *     description: Retrieve all responds for the authenticated seller.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved seller responds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/respond'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "عدم مجوز! توکن نامعتبر است یا منقضی شده است."
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
 *  /createResponse:
 *   post:
 *     summary: Create response
 *     description: Create a response to a request and send it to the buyer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request_id:
 *                 type: integer
 *               buyerID:
 *                 type: integer
 *               price:
 *                 type: integer
 *               seller_respond:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 newResponse:
 *                   type: object
 *                   items:
 *                     $ref: '#/components/schemas/respond'
 *             example:
 *               msg: پاسخ به‌روزرسانی شد
 *               price: 10
 *               seller_respond: "ok/no/mojod mikonam"
 *               timestamp: "2023-07-29T18:00:00Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "عدم مجوز! توکن نامعتبر است یا منقضی شده است."
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "درخواست یافت نشد"
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
 * /UpdateResponse:
 *   patch:
 *     summary: Update response
 *     description: Update a response by providing the response ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response_id:
 *                 type: integer
 *               price:
 *                 type: integer
 *               seller_respond:
 *                 type: string
 *     responses:
 *       200:
 *         description: Response updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 price:
 *                   type: integer
 *                 seller_respond:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *             example:
 *               msg: پاسخ به‌روزرسانی شد
 *               price: 10
 *               seller_respond: "ok/no/mojod mikonam"
 *               timestamp: "2023-07-29T18:00:00Z"
 *       403:
 *         description: Forbidden - Access not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "عدم دسترسی مجاز"
 *       404:
 *         description: Response not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "پاسخ پیدا نشد"
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
 * /DeleteResponse:
 *   delete:
 *     summary: Delete response
 *     description: Delete a response by providing the response ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Response deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "پاسخ حذف شد"
 *       403:
 *         description: Forbidden - Access not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "عدم دسترسی مجاز"
 *       404:
 *         description: Response not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "پاسخ پیدا نشد"
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
