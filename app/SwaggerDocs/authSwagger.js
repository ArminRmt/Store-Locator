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
 *                       message:
 *                         type: string
 *                         description: The error message indicating the reason for the validation failure.
 *               example:
 *                 msg: "Bad request with validation errors."
 *                 errors:
 *                   - field: "phone"
 *                     message: "Phone number must be a 10-digit number."
 *                   - field: "role"
 *                     message: "Role must be either 'admin' or 'buyer'."
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: User sign in
 *     description: Sign in a user.
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
 *         description: User signed in successfully with a token
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
 *                 accessToken:
 *                   type: string
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
 *                       message:
 *                         type: string
 *                         description: The error message indicating the reason for the validation failure.
 *               example:
 *                 msg: "Bad request with validation errors."
 *                 errors:
 *                   - field: "phone"
 *                     message: "Phone number must be a 10-digit number."
 */
