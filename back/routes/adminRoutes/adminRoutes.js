const { Router } = require("express");

const {
  handleGetUsersForAdmin,
  handleUserConfirmForAdmin,
  handleDeleteUserForAdmin,
  handleChangeUserPasswordForAdmin,
  handleCreateUserForAdmin,
} = require("../../controllers/userController/userController");
const {
  handleEditUserInfoForAdmin,
} = require("../../controllers/userInfoController/userInfoController");
const {
  handleGetSetting,
  handleEditSetting,
} = require("../../controllers/settingController/settingController");

const router = new Router();

//* Start User
/**
 * @swagger
 * /admin/users:
 *   get:
 *    tags:
 *     - Admin:User
 *    parameters:
 *      - in: query
 *        name: pageNumber
 *        schema:
 *          type: string
 *      - in: query
 *        name: itemsCount
 *        schema:
 *          type: string
 *      - in: query
 *        name: filter
 *        schema:
 *          type: string
 *      - in: query
 *        name: role
 *        schema:
 *          type: string
 *    deepLinking: true
 */
router.get("/users", handleGetUsersForAdmin);

/**
 * @swagger
 * /admin/user/{id}/confirm:
 *   patch:
 *    tags:
 *     - Admin:User
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required:
 *          - id
 */
router.patch("/user/:id/confirm", handleUserConfirmForAdmin);

/**
 * @swagger
 * /admin/user/{id}:
 *   delete:
 *    tags:
 *     - Admin:User
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required:
 *          - id
 */
router.delete("/user/:id", handleDeleteUserForAdmin);

/**
 * @swagger
 * /admin/user/{id}/change-password:
 *   patch:
 *    tags:
 *     - Admin:User
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required:
 *          - id
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:      # Request body contents
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *             confirmPassword:
 *               type: string
 *           required:
 *            - password
 *            - confirmPassword
 */
router.patch("/user/:id/change-password", handleChangeUserPasswordForAdmin);

/**
 * @swagger
 * /admin/user:
 *   post:
 *    tags:
 *     - Admin:User
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             avatar:
 *               type: string
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
 *             permissions:
 *               type: string
 *             nationalNumber:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             role:
 *               type: string
 *               enum: ["ADMIN", "STUDENT"]
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
 *            - role
 */
router.post("/user", handleCreateUserForAdmin);

/**
 * @swagger
 * /admin/user/{id}:
 *   put:
 *    tags:
 *     - Admin:User
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required:
 *          - id
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             avatar:
 *               type: string
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
 *             permissions:
 *               type: string
 *             nationalNumber:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             role:
 *               type: string
 *               enum: ["ADMIN", "STUDENT"]
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
 *            - role
 */
router.put("/user/:id", handleEditUserInfoForAdmin);
//* End User

//* Start Setting
/**
 * @swagger
 * /admin/setting:
 *   get:
 *    tags:
 *     - Admin:Setting
 */
router.get("/setting", handleGetSetting);

/**
 * @swagger
 * /admin/setting:
 *   put:
 *    tags:
 *     - Admin:Setting
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             paymentGateway:
 *               type: []
 *           required:
 *            - paymentGateway
 */
router.put("/setting", handleEditSetting);
//* End Setting

module.exports = router;
