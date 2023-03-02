const express = require("express");
const authController = require("../controllers/authController.js")

const usersRouter = express.Router();

usersRouter.route("/signup").post(authController.signup)
usersRouter.route("/login").post(authController.login)
usersRouter.route("/logout/:token").get(authController.protect, authController.logout)
usersRouter.route("/forgotpassword").post(authController.protect, authController.forgotPassword)
usersRouter.route("/resetpasword/:token").post(authController.protect, authController.resetPassword)

module.exports = usersRouter;
