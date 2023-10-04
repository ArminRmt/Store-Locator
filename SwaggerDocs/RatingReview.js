/**
 * @swagger
 * /submitShopRating:
 *   post:
 *     summary: Submit Shop Rating and Feedback
 *     description: Submit a rating and feedback for a shop.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - RatingReview
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
 *               shop_id:
 *                 type: integer
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               feedback_text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "امتیاز و بازخورد با موفقیت ارسال شد."
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
 *                   error: "خطای سرور داخلی"
 *
 * /getShopFeedbackTexts:
 *   get:
 *     summary: Get Shop All Feedback Texts
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - RatingReview
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shop_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 feedbackTexts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       feedback_text:
 *                         type: string
 *                 totalPages:
 *                   type: integer
 *                 example:
 *                   feedbackTexts:
 *                     - feedback_text: "متشکرم از خرید خوب شما."
 *                   totalPages: 5
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
 *                   example: "شما دسترسی به این فروشگاه را ندارید."
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "هیچ متن بازخوردی یافت نشد"
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
 * /updateShopReview:
 *   patch:
 *     summary: Update Shop Review
 *     description: Update an existing shop review by ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - RatingReview
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
 *               review_id:
 *                 type: integer
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               feedback_text:
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
 *                   example: "نقد با موفقیت به‌روزرسانی شد."
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
 * /deleteShopReview:
 *   delete:
 *     summary: Delete Shop Review
 *     description: Delete a shop review by ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - RatingReview
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer token
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review_id:
 *                 type: integer
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
 *                   example: "نقد با موفقیت حذف شد."
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
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Review not found."
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
 * /getUserFeedbackTexts:
 *   get:
 *     summary: Get User Feedback Texts
 *     description: Retrieve feedback texts of reviews submitted by the current user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - RatingReview
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
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
 *               type: object
 *               properties:
 *                 feedbackTexts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       feedback_text:
 *                         type: string
 *                 totalPages:
 *                   type: integer
 *                 example:
 *                   feedbackTexts:
 *                     - feedback_text: "متشکرم از خرید خوب شما."
 *                   totalPages: 5
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
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Review not found."
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
