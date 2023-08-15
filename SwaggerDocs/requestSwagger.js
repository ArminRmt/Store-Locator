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
 *           format: Bearer token
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
 *                 piece_name:
 *                   type: string
 *                 content:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   items:
 *                     $ref: '#/components/schemas/request'
 *             example:
 *               msg: درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد
 *               piece_name: "Example Piece 1"
 *               content: "Example content for Piece 1"
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
 */

/**
 * @swagger
 * /UpdateRequest:
 *   patch:
 *     summary: Update request
 *     description: Update a request by providing the request ID, piece name, and content.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request_id:
 *                 type: integer
 *               piece_name:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 piece_name:
 *                   type: string
 *                 content:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *             example:
 *               msg: درخواست به‌روزرسانی شد
 *               piece_name: "Example Piece 1"
 *               content: "Example content for Piece 1"
 *               timestamp: "2023-07-29T18:00:00Z"
 *       400:
 *         description: Bad request with error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "نام قطعه الزامی هستند"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Request not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "خطای سرور"
 */
/**
 * @swagger
 * /UserRequests:
 *   get:
 *     summary: Get user requests
 *     description: Retrieve requests made by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer token
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/request'
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
 *                   example: "خطای سرور داخلی"
 *
 */
/**
 * @swagger
 * /DeleteRequest:
 *   delete:
 *     summary: Delete request
 *     description: Delete a request by providing the request ID.
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
 *     responses:
 *       200:
 *         description: Request deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "درخواست حذف شد"
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
 *         description: Request not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "درخواست پیدا نشد"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "خطای سرور"
 */
