/**
 * @swagger
 * /GetRequest/{id}:
 *   get:
 *     summary: Get a User Request by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the request to retrieve.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/request'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Request not found"
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
 *  /createRequest:
 *   post:
 *     summary: Create a Request and Send it to Nearest Sellers
 *     description: Create a request and send it to the nearest sellers.
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
 *               userLongitude:
 *                 type: string
 *                 format: float
 *               userLatitude:
 *                 type: string
 *                 format: float
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
 *                 request_id:
 *                   type: integer
 *                 piece_name:
 *                   type: string
 *                 content:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                 nearest_shops:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       seller_id:
 *                         type: integer
 *                       latitude:
 *                         type: string
 *                         format: float
 *                       longitude:
 *                         type: string
 *                         format: float
 *             example:
 *               msg: "درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد"
 *               request_id: 11
 *               piece_name: "piece1"
 *               content: "ahahah"
 *               timestamp: "2023-09-20T22:52:54.509Z"
 *               nearest_shops:
 *                 - id: 1
 *                   seller_id: 1
 *                   latitude: "36.538400"
 *                   longitude: "52.682200"
 *                 - id: 2
 *                   seller_id: 1
 *                   latitude: "36.565000"
 *                   longitude: "52.684000"
 *                 - id: 4
 *                   seller_id: 1
 *                   latitude: "36.534900"
 *                   longitude: "52.652800"
 *                 - id: 5
 *                   seller_id: 1
 *                   latitude: "36.534900"
 *                   longitude: "52.652800"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "عدم مجوز! توکن نامعتبر است یا منقضی شده است."
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
 *                 request_id:
 *                   type: integer
 *                 content:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *             example:
 *               msg: درخواست به‌روزرسانی شد
 *               request_id: 1
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
 *                 error:
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
 *                 error:
 *                   type: string
 *                   example: "خطای سرور"
 */
/**
 * @swagger
 * /userRequests:
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
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
 *         description: Request not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "درخواست پیدا نشد"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "خطای سرور"
 */
/**
 * @swagger
 * /searchRequests:
 *   get:
 *     summary: Search Requests
 *     description: Search for requests based on specified criteria.
 *     security:
 *       - bearerAuth: []
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
 *         description: Success - Matching Requests Found
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
 *                   description: An array of matching request records.
 *                   items:
 *                     $ref: '#/components/schemas/request'
 *       400:
 *         description: Bad Request - Invalid Keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "کلمه کلیدی جستجو نامعتبر است"
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
 * /autoComplete:
 *   get:
 *     summary: Get Auto-Completion Suggestions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The partial query for auto-completion.
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
