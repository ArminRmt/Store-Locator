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
 *         description: درخواست ها به با فرمتی که در مدل رکوعست قابل مشاهده هست فرستاده میشوند
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *              msg: درخواست با موفقیت به نزدیک ترین فروشنده ها ارسال شد
 *       401:
 *         description: اهراز هویت نشده
 *       404:
 *         description: فرد پیدا نشد
 *       500:
 *         description: ارور سرور داخلی
 */

/**
 * @swagger
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
 *           format: date-time
 *       example:
 *         id: 1
 *         users_id: 1
 *         seller_id: 2
 *         piece_name: "Sample Piece"
 *         content: "Sample content"
 *         timestamp: "2023-07-29T18:00:00.000Z"
 */
