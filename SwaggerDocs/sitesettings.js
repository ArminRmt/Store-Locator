/**
 * @swagger
 * /getSetting/{key}:
 *   get:
 *     summary: Get setting by key
 *     description: Retrieve a specific site setting by key.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Settings
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
 * /homePageSettings/{keyPrefix}:
 *   get:
 *     summary: Get Settings by Key Prefix
 *     description: Retrieve site settings by key prefix.
 *     tags:
 *       - Settings
 *     parameters:
 *       - name: keyPrefix
 *         in: keyPrefix
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success - Settings Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: A JSON object containing settings with keys that match the provided prefix.
 *             example:
 *               homepage_nav_logo: "path/to/logo.png"
 *               homepage_nav_main_title: "Welcome to Our Website"
 *
 *               homepage_section1_title: "About Us"
 *               homepage_section1_image: "path/to/logo.png"
 *               homepage_section1_text: "We are a leading company..."
 *
 *               homepage_section2_title: "Services"
 *               homepage_section2_image1: "path:/to/service1_image.png"
 *               homepage_section2_text1: "Service 1 description..."
 *               homepage_section2_image2: "path:/to/service2_image.png"
 *               homepage_section2_text2: "Service 2 description..."
 *               homepage_section2_image3: "path:/to/service3_image.png"
 *               homepage_section2_text3: "Service 3 description..."
 *
 *               homepage_section3_title: "Contact Us"
 *               homepage_section3_image: "path/to/contact_us_image.png"
 *               homepage_section3_text: "Get in touch with us today!"
 *
 *               homepage_footer_title1: "Company Info"
 *               homepage_footer_title2: "Contact"
 *               homepage_footer_title3: "Social Media"
 *               homepage_footer_sabt_agahi: "1234567890"
 *               homepage_footer_sabt_froshgah: "0987654321"
 *               homepage_footer_shomare: "+1 (123) 456-7890"
 *               homepage_footer_addres: "123 Main St, City, Country"
 *               homepage_footer_email: "contact@example.com"
 *               homepage_footer_aboutUs: "About our company..."
 *               homepage_footer_license: "Copyright © 2023 Company Name"
 *               homepage_footer_githubLink: "https://github.com/example"
 *               homepage_footer_telegramLink: "https://t.me/example"
 *               homepage_footer_linkdinLink: "https://www.linkedin.com/company/example"
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
 * /createOrUpdateSetting:
 *   post:
 *     summary: Create or update a site setting
 *     description: Create or update a site setting based on the provided key and value in the request body. If a file is attached to the request, it updates the setting with an image path. Otherwise, it updates the setting with a value.
 *     tags:
 *       - Settings
 *     parameters:
 *       - name: key
 *         in: body
 *         required: true
 *         description: The key of the site setting.
 *         schema:
 *           type: string
 *       - name: value
 *         in: body
 *         required: true
 *         description: The value or image path for the site setting.
 *         schema:
 *           type: string
 *       - name: file
 *         in: formData
 *         required: false
 *         description: An optional file to upload as an image for the site setting.
 *         type: file
 *     responses:
 *       '200':
 *         description: Site setting created or updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 */

/**
 * @swagger
 * /deleteSetting/{key}:
 *   delete:
 *     summary: Delete a site setting by key
 *     description: Deletes a site setting with the specified key.
 *     tags:
 *       - Settings
 *     parameters:
 *       - name: key
 *         in: path
 *         required: true
 *         description: The key of the site setting to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Site setting deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "تنظیم با موفقیت حذف شد."
 *                   description: A success message.
 *       '404':
 *         description: Site setting not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "تنظیم یافت نشد."
 *                   description: An error message indicating that the setting was not found.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "خطای داخلی سرور"
 *                   description: An error message.
 */
