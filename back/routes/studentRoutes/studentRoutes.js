const { Router } = require("express");

const {
  handleGetOverviewForStudent,
} = require("../../controllers/overviewController/overviewController");

const router = new Router();

//* Start Overview
/**
 * @swagger
 * /student/overview:
 *   get:
 *    tags:
 *     - Student:Overview
 *    deepLinking: true
 */
router.get("/overview", handleGetOverviewForStudent);
//* End Overview

module.exports = router;
