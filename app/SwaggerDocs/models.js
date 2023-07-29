/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the user.
 *         full_name:
 *           type: string
 *           description: The full name of the user.
 *         phone:
 *           type: string
 *           description: The phone number of the user.
 *         password:
 *           type: string
 *           description: The hashed password of the user.
 *         role:
 *           type: string
 *           enum: [admin, buyer]
 *           description: The role of the user. Can be either "admin" or "buyer".
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp indicating when the user was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp indicating when the user was last updated.
 *       example:
 *         id: 1
 *         full_name: "John Doe"
 *         phone: "9876543210"
 *         password: "$2a$10$...."
 *         role: "buyer"
 *         createdAt: "2023-07-29T17:13:34.270Z"
 *         updatedAt: "2023-07-29T17:13:34.270Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     shop:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the shop.
 *         seller_id:
 *           type: integer
 *           description: The ID of the seller associated with the shop.
 *         name:
 *           type: string
 *           description: The name of the shop.
 *         phone:
 *           type: string
 *           description: The phone number of the shop.
 *         bio:
 *           type: string
 *           description: The bio or description of the shop.
 *         address:
 *           type: string
 *           description: The address of the shop.
 *         open_time:
 *           type: string
 *           format: time
 *           description: The opening time of the shop.
 *         avg_rating:
 *           type: number
 *           format: float
 *           description: The average rating of the shop.
 *         latitude:
 *           type: number
 *           format: double
 *           description: The latitude coordinate of the shop's location.
 *         longitude:
 *           type: number
 *           format: double
 *           description: The longitude coordinate of the shop's location.
 *       example:
 *         id: 1
 *         seller_id: 1001
 *         name: "ABC Store"
 *         phone: "9876543210"
 *         bio: "A local store selling various products."
 *         address: "123 Main Street"
 *         open_time: "08:00:00"
 *         avg_rating: 4.5
 *         latitude: 40.7128
 *         longitude: -74.0060
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     sellers_reviews:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the review.
 *         shop_id:
 *           type: integer
 *           description: The ID of the shop that the review is associated with.
 *         buyer_id:
 *           type: integer
 *           description: The ID of the buyer who left the review.
 *         rating:
 *           type: integer
 *           description: The rating given in the review.
 *         feedback_text:
 *           type: string
 *           description: The text feedback provided in the review.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp indicating when the review was created.
 *       example:
 *         id: 1
 *         shop_id: 1001
 *         buyer_id: 2002
 *         rating: 4
 *         feedback_text: "Great shopping experience!"
 *         timestamp: "2023-07-29T18:30:00.000Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     seller:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the seller.
 *         full_name:
 *           type: string
 *           description: The full name of the seller.
 *         phone:
 *           type: string
 *           description: The phone number of the seller.
 *         password:
 *           type: string
 *           description: The hashed password of the seller.
 *       example:
 *         id: 1
 *         full_name: "John Doe"
 *         phone: "9876543210"
 *         password: "$2a$10$13b6OERE..."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     respond:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the respond.
 *         seller_id:
 *           type: integer
 *           description: The ID of the seller who made the respond.
 *         request_id:
 *           type: integer
 *           description: The ID of the request to which the respond belongs.
 *         price:
 *           type: number
 *           format: double
 *           description: The price offered in the respond.
 *         type:
 *           type: string
 *           description: The type of the respond.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp indicating when the respond was created.
 *       example:
 *         id: 1
 *         seller_id: 1001
 *         request_id: 2002
 *         price: 150.99
 *         type: "Offer"
 *         timestamp: "2023-07-29T19:00:00.000Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     request:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the request.
 *         users_id:
 *           type: integer
 *           description: The ID of the user who made the request.
 *         seller_id:
 *           type: integer
 *           description: The ID of the seller to whom the request is sent.
 *         piece_name:
 *           type: string
 *           description: The name of the requested piece.
 *         content:
 *           type: string
 *           description: The content or description of the request.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp indicating when the request was created.
 *       example:
 *         id: 1
 *         users_id: 1001
 *         seller_id: 2002
 *         piece_name: "Ring"
 *         content: "Looking for an elegant ring for a special occasion."
 *         timestamp: "2023-07-29T19:30:00.000Z"
 */
