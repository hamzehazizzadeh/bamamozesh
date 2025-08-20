const { Router } = require("express");

const {
  handleRegister,
  handleLogin,
  handleForgotPassword,
} = require("../../controllers/authController/authController");

const router = new Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *    tags:
 *     - Auth
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             fatherName:
 *               type: string
 *             unionName:
 *               type: string
 *             businessCategory:
 *               type: string
 *             workAddress:
 *               type: string
 *             email:
 *               type: string
 *             gender:
 *               type: string
 *             nationalNumber:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             password:
 *               type: string
 *             confirmPassword:
 *               type: string
 *           required:
 *            - firstName
 *            - lastName
 *            - fatherName
 *            - unionName
 *            - businessCategory
 *            - workAddress
 *            - email
 *            - gender
 *            - permissions
 *            - nationalNumber
 *            - phoneNumber
 *            - password
 *            - confirmPassword
 */
router.post("/register", handleRegister);

/**
 * @swagger
 * /auth/login:
 *   post:
 *    tags:
 *     - Auth
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:      # Request body contents
 *           type: object
 *           properties:
 *             phoneNumber:
 *               type: string
 *               maxLength: 11
 *             password:
 *               type: string
 *           required:
 *            - phoneNumber
 *            - password
 */
router.post("/login", handleLogin);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *    tags:
 *     - Auth
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:      # Request body contents
 *           type: object
 *           properties:
 *             nationalNumber:
 *               type: string
 *               minLength: 10
 *               maxLength: 10
 *             phoneNumber:
 *               type: string
 *               minLength: 11
 *               maxLength: 11
 *           required:
 *            - nationalNumber
 *            - phoneNumber
 */
router.post("/forgot-password", handleForgotPassword);

module.exports = router;
