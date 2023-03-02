const express = require("express")
const viewsController = require("../controllers/viewsController.js")
const authController = require("../controllers/authController.js")

const viewsRouter = express.Router()

viewsRouter.route("/").get(viewsController.getHomePage)
viewsRouter.route("/auth").get(viewsController.getAuthPage)

viewsRouter.route("/dashboard").get(authController.protect, viewsController.getDashboardPage)
viewsRouter.route("/purchases").get(authController.protect, viewsController.getPurchasesPage)
viewsRouter.route("/purchases/:id").get(authController.protect, viewsController.getSinglePurchasePage)

viewsRouter.use(authController.isLoggedIn)
viewsRouter.route("/subscriptions").get(viewsController.getSubscriptionsPage)

viewsRouter.route("/get-dispute/:id").get(authController.restrictTo("admin"), viewsController.getSingleDisputePage)
viewsRouter.route("/orderpage/:productId").get(viewsController.getOrderPage)

module.exports = viewsRouter;