/**
 * @swagger
 * /homePageSettings:
 *   get:
 *     summary: Get Settings by Key Prefix
 *     description: Retrieve site settings by key prefix.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyPrefix:
 *                 type: string
 *                 description: The prefix of the settings keys to retrieve.
 *     responses:
 *       200:
 *         description: Success - Settings Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: A JSON object containing settings with keys that match the provided prefix.
 *             example:
 *               homepage nav logo: "path/to/logo.png"
 *               homepage nav main_title: "Welcome to Our Website"
 *
 *               homepage section1_title: "About Us"
 *               homepage section1_image: "path/to/logo.png"
 *               homepage section1_text: "We are a leading company..."
 *
 *               homepage section2_title: "Services"
 *               homepage section2_image1: "path:/to/service1_image.png"
 *               homepage section2_text1: "Service 1 description..."
 *               homepage section2_image2: "path:/to/service2_image.png"
 *               homepage section2_text2: "Service 2 description..."
 *               homepage section2_image3: "path:/to/service3_image.png"
 *               homepage section2_text3: "Service 3 description..."
 *
 *               homepage section3_title: "Contact Us"
 *               homepage section3_image: "path/to/contact_us_image.png"
 *               homepage section3_text: "Get in touch with us today!"
 *
 *               homepage footer title1: "Company Info"
 *               homepage footer title2: "Contact"
 *               homepage footer title3: "Social Media"
 *               homepage footer sabt_agahi: "1234567890"
 *               homepage footer sabt_froshgah: "0987654321"
 *               homepage footer shomare: "+1 (123) 456-7890"
 *               homepage footer addres: "123 Main St, City, Country"
 *               homepage footer email: "contact@example.com"
 *               homepage footer aboutUs: "About our company..."
 *               homepage footer license: "Copyright © 2023 Company Name"
 *               homepage footer githubLink: "https://github.com/example"
 *               homepage footer telegramLink: "https://t.me/example"
 *               homepage footer linkdinLink: "https://www.linkedin.com/company/example"
 *
 *       404:
 *         description: Not Found - No Settings Matching the Prefix
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "تنظیمات با پیش‌وند کلید 'prefix' یافت نشد."
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
 * /createSetting:
 *   post:
 *     summary: Create Setting
 *     description: Create a new setting with a key and an optional value or file.
 *     parameters:
 *       - name: Bearer token
 *         in: header
 *         required: true
 *         type: string
 *       - name: key
 *         in: formData
 *         description: The key for the setting.
 *         required: true
 *         type: string
 *       - name: value
 *         in: formData
 *         description: The value for the setting (optional).
 *         required: false
 *         type: string
 *       - name: file
 *         in: formData
 *         description: The file to upload (optional).
 *         required: false
 *         type: file
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success - Setting Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ایتم با موفقیت ایجاد شد."
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
 *                   example: "نیاز به نقش مدیر دارد!"
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
 * /getSetting/{key}:
 *   get:
 *     summary: Get setting by key
 *     description: Retrieve a specific site setting by key.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SiteSettings'
 *       404:
 *         description: Setting not found
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
 * /updateSetting:
 *   patch:
 *     summary: Update setting
 *     description: Update a specific setting in site settings.
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
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *                 example: "/new/logo/path.png"
 *     responses:
 *       200:
 *         description: Setting successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Setting successfully updated."
 *                 updatedSetting:
 *                   $ref: '#/components/schemas/SiteSettings'
 *       404:
 *         description: Setting not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Setting not found."
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
 * /deleteSetting/{key}:
 *   delete:
 *     summary: Delete setting by key
 *     description: Delete a specific site setting by key.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           format: Bearer <token>
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Setting successfully deleted
 *       404:
 *         description: Setting not found
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
