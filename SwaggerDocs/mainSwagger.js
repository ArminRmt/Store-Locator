/**
 * @swagger
 *  /createRequest:
 *   post:
 *     summary: Create request
 *     description: Create a request and send it to the nearest shops.
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
 *               piece_name:
 *                 type: string
 *               content:
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
 *                 AllRequest:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Request'
 *             example:
 *               msg: درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد
 *               AllRequest:
 *                 - id: 1
 *                   users_id: 123
 *                   seller_id: 456
 *                   piece_name: "Example Piece 1"
 *                   content: "Example content for Piece 1"
 *                   timestamp: "2023-07-29T18:00:00Z"
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
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "هیچ توکنی ارائه نشده است!"
 *       404:
 *         description: Not Found
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
 *     Request:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         users_id:
 *           type: integer
 *         seller_id:
 *           type: integer
 *         piece_name:
 *           type: string
 *         content:
 *           type: string
 *         timestamp:
 *           type: string
 */

/**
 * @swagger
 *  /createResponse:
 *   post:
 *     summary: Create response
 *     description: Create a response to a request and send it to the requester.
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
 *               request_id:
 *                 type: integer
 *               price:
 *                 type: number
 *               type:
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
 *                     $ref: '#/components/schemas/Respond'
 *             example:
 *               msg: پاسخ با موفقیت ارسال شد
 *               newResponse:
 *                 - id: 1
 *                   users_id: 123
 *                   seller_id: 456
 *                   piece_name: "Example Piece 1"
 *                   content: "Example content for Piece 1"
 *                   timestamp: "2023-07-29T18:00:00Z"
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
 *
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         users_id:
 *           type: integer
 *         seller_id:
 *           type: integer
 *         piece_name:
 *           type: string
 *         content:
 *           type: string
 *         timestamp:
 *           type: string
 */
