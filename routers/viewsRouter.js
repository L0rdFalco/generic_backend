const express = require("express")
const viewsController = require("../controllers/viewsController.js")
const authController = require("../controllers/authController.js")

const viewsRouter = express.Router()

viewsRouter.route("/").get(viewsController.getHomePage)
viewsRouter.route("/auth").get(viewsController.getAuthPage)

viewsRouter.route("/dashboard/:authtoken").get(authController.protect, viewsController.getDashboardPage)
viewsRouter.route("/purchases/:authtoken").get(authController.protect, viewsController.getPurchasesPage)
viewsRouter.route("/purchases/:id/:authtoken").get(authController.protect, viewsController.getSinglePurchasePage)
viewsRouter.route("/subscriptions/:authtoken").get(authController.protect, viewsController.getSubscriptionsPage)
viewsRouter.route("/get-dispute/:id/:authtoken").get(authController.protect, authController.restrictTo("admin"), viewsController.getSingleDisputePage)
viewsRouter.route("/orderpage/:productId/:authtoken").get(authController.protect, viewsController.getOrderPage)

module.exports = viewsRouter;