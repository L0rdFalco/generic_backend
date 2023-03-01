const express = require("express")
const webhooksController = require("../controllers/webhooksController.js")

const webhooksRouter = express.Router()

webhooksRouter.route("/single-purchase-completed").get(webhooksController.singlePurchaseCompleted)

module.exports = webhooksRouter