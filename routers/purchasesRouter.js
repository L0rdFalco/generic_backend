const express = require("express")
const purchasesController = require("../controllers/purchasesController.js")
const authController = require("../controllers/authController.js")

const purchasesRouter = express.Router();

purchasesRouter.route("/").post(authController.restrictTo("user"), purchasesController.createOrder)
purchasesRouter.route("/:orderID/capture").post(authController.restrictTo("user"), purchasesController.capturePayment)

module.exports = purchasesRouter;