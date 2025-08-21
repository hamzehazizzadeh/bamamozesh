const { Router } = require("express");

const { multerError, upload } = require("../../utils/upload/upload");

const {
  handleEditUserInfo,
  handleGetUserInfo,
  handleChangePassword,
} = require("../../controllers/userInfoController/userInfoController");
const {
  handleGetMeta,
} = require("../../controllers/metaController/metaController");
const {
  handleUploadDocument,
} = require("../../controllers/documentController/documentController");
const {
  handleGetOverview,
} = require("../../controllers/overviewController/overviewController");

const router = new Router();

//* Start User Info
/**
 * @swagger
 * /user/info:
 *   get:
 *    tags:
 *     - User
 */
router.get("/info", handleGetUserInfo);
/**
 * @swagger
 * /user/info:
 *   put:
 *    tags:
 *     - User
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
 *             birthDate:
 *               type: string
 *             gender:
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
 */
router.put("/info", handleEditUserInfo);
/**
 * @swagger
 * /user/change-password:
 *   post:
 *    tags:
 *     - User
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:      # Request body contents
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *             newPassword:
 *               type: string
 *             confirmPassword:
 *               type: string
 *           required:
 *            - password
 *            - newPassword
 *            - confirmPassword
 */
router.post("/change-password", handleChangePassword);
//* End User Info

//* Start Meta
/**
 * @swagger
 * /user/meta:
 *   get:
 *    tags:
 *     - User:Meta
 *    deepLinking: true
 */
router.get("/meta", handleGetMeta);
//* End Meta

//* Start Upload
/**
 * @swagger
 * /user/upload:
 *   post:
 *    tags:
 *     - User:Upload
 *    requestBody:
 *     content:
 *       multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *             file:
 *               type: binary
 *           required:
 *            - file
 *    deepLinking: true
 */
router.post(
  "/upload",
  upload.single("file"),
  multerError,
  handleUploadDocument
);
//* End Upload

//* Start Overview
/**
 * @swagger
 * /admin/overview:
 *   get:
 *    tags:
 *     - Admin:Overview
 *    deepLinking: true
 */
router.get("/overview", handleGetOverview);
//* End Overview

module.exports = router;
