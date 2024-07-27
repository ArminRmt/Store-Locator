/**
 * @swagger
 * tags:
 *   name: Verification
 *   description: API endpoints for verification code functionality
 */

/**
 * @swagger
 * /send-verification-code:
 *   post:
 *     summary: Send verification code
 *     tags: [Verification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The phone number to send the verification code to
 *                 example: "09384020591"
 *     responses:
 *       200:
 *         description: Successfully sent the verification code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: The verification code sent to the user
 *                   example: "123456"
 *       500:
 *         description: Failed to send the verification code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Failed to send verification code"
 */

/**
 * @swagger
 * /verify-code:
 *   post:
 *     summary: Verify code
 *     tags: [Verification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: The phone number to verify
 *                 example: "09384020591"
 *               code:
 *                 type: string
 *                 description: The verification code to verify
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Successfully verified the code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 verified:
 *                   type: boolean
 *                   description: Indicates if the code is verified or not
 *                   example: true
 *       500:
 *         description: Failed to verify the code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: "Failed to verify code"
 */
