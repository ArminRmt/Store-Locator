/**
 * @swagger
 * /user-admin/signup:
 *   post:
 *     summary: User admin sign up
 *     description: Sign up a user as an admin.
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
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: ثبت نام موفقیت‌آمیز
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ثبت نام موفقیت‌آمیز"
 *                 newUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     full_name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     password:
 *                       type: string
 *                     role:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *             example:
 *               msg: "ثبت نام موفقیت‌آمیز"
 *               newUser:
 *                 id: 4
 *                 full_name: "mamad"
 *                 phone: "9876543221"
 *                 password: "$argon2id$v=19$m=...."
 *                 role: "buyer"
 *                 updatedAt: "2023-07-29T18:16:42.544Z"
 *                 createdAt: "2023-07-29T18:16:42.544Z"
 *       400:
 *         description: Bad request with error messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Bad request with validation errors."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: The field that caused the validation error.
 *                       error:
 *                         type: string
 *                         description: The error message indicating the reason for the validation failure.
 *               example:
 *                 msg: "Bad request with validation errors."
 *                 errors:
 *                   - field: "phone"
 *                     error: "Phone number must be a 10-digit number."
 *                   - field: "role"
 *                     error: "Role must be either 'admin' or 'buyer'."
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in user
 *     description: Sign in a user using their phone number and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful sign in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ورود موفقیت‌آمیز"
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: null
 *                 error:
 *                   type: string
 *                   example: "رمز عبور نامعتبر است!"
 *       404:
 *         description: Seller not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "کاربر پیدا نشد."
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
 * /signinSeller:
 *   post:
 *     summary: Sign in seller
 *     description: Sign in a seller using their phone number and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful sign in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ورود موفقیت‌آمیز"
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: null
 *                 error:
 *                   type: string
 *                   example: "رمز عبور نامعتبر است!"
 *       404:
 *         description: Seller not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "فروشنده پیدا نشد."
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
 * /seller/signup:
 *   post:
 *     summary: Seller sign-up
 *     description: Register a new seller.
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
 *     responses:
 *       201:
 *         description: ثبت نام موفقیت‌آمیز of the seller.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message.
 *                 newSeller:
 *                   $ref: '#/components/schemas/seller'
 *       400:
 *         description: Bad request with error messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad request with validation errors."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         description: The field that caused the validation error.
 *                       error:
 *                         type: string
 *                         description: The error message indicating the reason for the validation failure.
 *               example:
 *                 error: "Bad request with validation errors."
 *                 errors:
 *                   - field: "phone"
 *                     error: "Phone number must be a 10-digit number."
 */
/**
 * @swagger
 *  /verify-token:
 *   get:
 *     summary: Verify Token
 *     description: Verify the validity of the token provided in the Authorization header.
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
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "توکن معتبر است."
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
 *               example:
 *                 error: "توکن منقضی شده است."
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
 */
