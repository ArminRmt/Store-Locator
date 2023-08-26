/**
 * @swagger
 * /getuserbytoken:
 *   get:
 *     summary: Get user by Token
 *     description: Retrieve a user by its Token
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     responses:
 *       200:
 *         description: The user with the specified ID
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
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *                 verificationCode:
 *                   type: string
 *                 verificationCodeExpiresAt:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: 1
 *               full_name: "armin"
 *               phone: "9876543210"
 *               password: "$argon2id....."
 *               role: "buyer"
 *               verificationCode: "null"
 *               verificationCodeExpiresAt: "null"
 *               createdAt: "2023-07-29T17:38:46.185Z"
 *               updatedAt: "2023-07-29T17:38:46.185Z"
 */

/**
 * @swagger
 * /updateUser:
 *   patch:
 *     summary: Update user
 *     description: Update a user's information. Requires be admin or owner of the user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: integer
 *           format: int64
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
 *       200:
 *         description: User Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "User Updated"
 *       400:
 *         description: Bad Request - invalid request data
 *       401:
 *         description: Unauthorized - invalid token or not authorized to update user
 *       403:
 *         description: Forbidden - only the owner or admin has this access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Only the owner or admin has this access"
 *       404:
 *         description: User Not found.
 *       500:
 *         description: Internal server error
 */
