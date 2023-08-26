/**
 * @swagger
 * /createResponse:
 *   post:
 *     summary: Create Response
 *     description: Create a response from a seller to a user's request.
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
 *                 type: string
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
 *                   example: "پاسخ با موفقیت ارسال شد"
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 request_id:
 *                   type: integer
 *                   example: 1
 *                 price:
 *                   type: string
 *                   example: "10.00"
 *                 seller_respond:
 *                   type: string
 *                   example: "ok"
 *                 timestamp:
 *                   type: string
 *                   example: "2023-07-29T18:00:00Z"
 *                 shopLatitude:
 *                   type: NUMERIC
 *                   example: 51.7
 *                 shopLongitude:
 *                   type: NUMERIC
 *                   example: 36.7
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
 *                 response_id:
 *                   type: integer
 *                 price:
 *                   type: integer
 *                 seller_respond:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *             example:
 *               msg: پاسخ به‌روزرسانی شد
 *               response_id: 1
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
 *                 request_id:
 *                   type: integer
 *                   example: 1
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
 * /getUserResponses:
 *   get:
 *     summary: Get User Responses
 *     description: Retrieve responses from sellers for requests made by the user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer token
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 seller_id: 123
 *                 request_id: 456
 *                 price: "10.00"
 *                 seller_respond: "daram"
 *                 timestamp: "2023-07-29T18:00:00Z"
 *                 shopLatitude: 51.7
 *                 shopLongitude: 36.7
 *               - id: 2
 *                 seller_id: 456
 *                 request_id: 789
 *                 price: "15.00"
 *                 seller_respond: "nahar"
 *                 timestamp: "2023-07-30T12:30:00Z"
 *                 shopLatitude: 51.7
 *                 shopLongitude: 36.7
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "توکن منقضی شده است."
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
 *           format: Bearer token
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/respond'
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
 */
