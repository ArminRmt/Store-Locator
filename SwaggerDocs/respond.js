/**
 * @swagger
 * /createResponse:
 *   post:
 *     summary: Create Response
 *     description: Create a response from a seller to a user's request.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Responds
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
 *                 shopID:
 *                   type: integer
 *                   example: 3
 *
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
 *                 error:
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
 *     tags:
 *       - Responds
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
 *               shopID: 3
 *       403:
 *         description: Forbidden - Access not allowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "عدم دسترسی مجاز"
 *       404:
 *         description: Response not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
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
 *     tags:
 *       - Responds
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
 *                 error:
 *                   type: string
 *                   example: "عدم دسترسی مجاز"
 *       404:
 *         description: Response not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
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
 *     tags:
 *       - Responds
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
 *                 shopName: "ایران خودرو"
 *                 shopID: 3
 *               - id: 2
 *                 seller_id: 456
 *                 request_id: 789
 *                 price: "15.00"
 *                 seller_respond: "nahar"
 *                 timestamp: "2023-07-30T12:30:00Z"
 *                 shopLatitude: 51.7
 *                 shopLongitude: 36.7
 *                 shopName: "ایران خودرو"
 *                 shopID: 3
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "توکن منقضی شده است."
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
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
 * /UserRequestResponses/{id}:
 *   get:
 *     summary: Get User's Responses for a Specific Request
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Responds
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the request.
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
 *                 combinedData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       seller_id:
 *                         type: integer
 *                       request_id:
 *                         type: integer
 *                       price:
 *                         type: number
 *                       seller_respond:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                       shopLatitude:
 *                         type: number
 *                       shopLongitude:
 *                         type: number
 *                       shopName:
 *                         type: string
 *                       shopID:
 *                         type: integer
 *                 totalPages:
 *                   type: integer
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
 *     tags:
 *       - Responds
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
 *                     $ref: '#/components/schemas/respond'
 *                 totalPages:
 *                   type: integer
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
/**
 * @swagger
 * /deleteUserResponse:
 *   patch:
 *     summary: Delete a User Response
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Responds
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response_id:
 *                 type: integer
 *             required:
 *               - response_id
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
 *                   example: "nothing just 204 staus code"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
/**
 * @swagger
 * /searchResponses:
 *   get:
 *     summary: Search Responses
 *     description: Search for responses based on specified criteria.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Responds
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer token
 *       - name: page
 *         in: query
 *         description: Page number (default is 1)
 *         required: false
 *         type: integer
 *       - name: q
 *         in: query
 *         description: Keyword to search for
 *         required: true
 *         type: string
 *       - name: startDate
 *         in: query
 *         description: Start date for filtering (optional)
 *         required: false
 *         type: string
 *         format: date
 *       - name: endDate
 *         in: query
 *         description: End date for filtering (optional)
 *         required: false
 *         type: string
 *         format: date
 *       - name: time
 *         in: query
 *         description: Desired timestamp for filtering (optional)
 *         required: false
 *         type: string
 *         format: date-time
 *     responses:
 *       200:
 *         description: Success - Matching Responses Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages.
 *                 data:
 *                   type: array
 *                   description: An array of matching response records.
 *                   items:
 *                     $ref: '#/components/schemas/respond'
 *       400:
 *         description: Bad Request - Invalid Search Keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid search keyword"
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "هیچ توکنی ارائه نشده است یا توکن نامعتبر است"
 *       403:
 *         description: Forbidden - User lacks required permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "نیاز به نقش مدیر یا فروشنده دارد!"
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
 * /autoCompleteRespond:
 *   get:
 *     summary: Get Auto-Completion Suggestions for Seller Responses
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Responds
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The partial query for auto-completion of seller responses.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example:
 *                 - "Suggestion 1"
 *                 - "Suggestion 2"
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
