/**
 * @swagger
 * /updateNavigationItem:
 *   post:
 *     summary: Update navigation item
 *     description: Update navigation item in site settings.
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
 *               Navigation_logo:
 *                 type: string
 *               Navigation_title:
 *                 type: string
 *               Navigation_aboutus:
 *                 type: string
 *               Navigation_callus:
 *                 type: string
 *               Navigation_sabtagahi:
 *                 type: string
 *               Navigation_sabtfrooshgah:
 *                 type: string
 *     responses:
 *       200:
 *         description: Navigation item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Navigation item updated successfully."
 *                 updatedNavigationItem:
 *                   $ref: '#/components/schemas/SiteSettings'
 *       404:
 *         description: Navigation item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Navigation item not found."
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
 * /updateFooterItem:
 *   post:
 *     summary: Update footer item
 *     description: Update footer item in site settings.
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
 *               Footer_sec1_header:
 *                 type: string
 *               Footer_sec1_item1:
 *                 type: string
 *               Footer_sec1_item2:
 *                 type: string
 *               Footer_sec2_header:
 *                 type: string
 *               Footer_sec2_item1:
 *                 type: string
 *               Footer_sec2_item2:
 *                 type: string
 *               Footer_sec3_header:
 *                 type: string
 *               Footer_sec3_item1:
 *                 type: string
 *               Footer_icon1:
 *                 type: string
 *               Footer_license:
 *                 type: string
 *     responses:
 *       200:
 *         description: Footer item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Footer item updated successfully."
 *                 updatedFooterItem:
 *                   $ref: '#/components/schemas/SiteSettings'
 *       404:
 *         description: Footer item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Footer item not found."
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
 * /updateSection1:
 *   post:
 *     summary: Update section 1
 *     description: Update section 1 content in site settings.
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
 *               Section1_header:
 *                 type: string
 *               Section1_text:
 *                 type: string
 *               Section1_button:
 *                 type: string
 *     responses:
 *       200:
 *         description: Section 1 updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Section 1 updated successfully."
 *                 updatedSection:
 *                   $ref: '#/components/schemas/SiteSettings'
 *       404:
 *         description: Section 1 not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Section 1 not found."
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
 * /updateSection2:
 *   post:
 *     summary: Update section 2
 *     description: Update section 2 content in site settings.
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
 *               Section2_header:
 *                 type: string
 *               Section2_text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Section 2 updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Section 2 updated successfully."
 *                 updatedSection:
 *                   $ref: '#/components/schemas/SiteSettings'
 *       404:
 *         description: Section 2 not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Section 2 not found."
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
 * /updateSection3:
 *   post:
 *     summary: Update section 3
 *     description: Update section 3 content in site settings.
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
 *               Section3_header:
 *                 type: string
 *               Section3_text:
 *                 type: string
 *               Section3_image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Section 3 updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Section 3 updated successfully."
 *                 updatedSection:
 *                   $ref: '#/components/schemas/SiteSettings'
 *       404:
 *         description: Section 3 not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Section 3 not found."
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
