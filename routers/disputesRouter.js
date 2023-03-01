const express = require("express");
const disputesController = require("../controllers/disputesController.js")
const authController = require("../controllers/authController.js")

const disputesRouter = express.Router()

disputesRouter.route("/requestRefund").post(authController.protect, authController.restrictTo("user"), disputesController.requestRefund)
disputesRouter.route("/changeBillingCycle").post(authController.protect,authController.restrictTo("user"),  disputesController.changeBillingCycle)
disputesRouter.route("/upgradeSubscription").post(authController.protect, authController.restrictTo("user"), disputesController.upgradeSubscription)
disputesRouter.route("/downgradeSubscription").post(authController.protect, authController.restrictTo("user"), disputesController.downgradeSubscription)
disputesRouter.route("/cancelSubscription").post(authController.protect, authController.restrictTo("user"), disputesController.cancelSubscription)


module.exports = disputesRouter