const express = require("express");
const authController = require("../controllers/authController.js")

const usersRouter = express.Router();

usersRouter.route("/signup").post(authController.signup)
usersRouter.route("/login").post(authController.login)
usersRouter.route("/forgotpassword").post(authController.forgotPassword)
usersRouter.route("/resetpasword/:token").post(authController.resetPassword)
usersRouter.route("/logout").get(authController.logout)

module.exports = usersRouter;
