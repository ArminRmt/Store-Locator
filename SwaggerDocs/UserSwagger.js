/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users. Requires admin authentication.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   full_name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *             example:
 *               - id: 1
 *                 full_name: "armin"
 *                 phone: "9876543210"
 *                 password: "$argon2id$v=....."
 *                 role: "buyer"
 *                 createdAt: "2023-07-29T17:13:34.270Z"
 *                 updatedAt: "2023-07-29T17:13:34.270Z"
 *               - id: 2
 *                 full_name: "admin"
 *                 phone: "9876543211"
 *                 password: "$argon2id$v=....."
 *                 role: "admin"
 *                 createdAt: "2023-07-29T17:13:34.336Z"
 *                 updatedAt: "2023-07-29T17:13:34.336Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Require Admin Role! - No token provided!
 *       404:
 *         description: User Not found.
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by its ID. Requires admin authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *               createdAt: "2023-07-29T17:38:46.185Z"
 *               updatedAt: "2023-07-29T17:38:46.185Z"
 *       401:
 *         description: Unauthorized
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
 *         description: Internal Server Error
 */

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
 * /user/{id}:
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

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user by its ID. Requires user's or admin's authentication.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seller to delete.
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
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
 *         description: Internal Server Error
 */
