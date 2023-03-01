const UsersModel = require("../models/UsersModel.js")

exports.protect = (request, response, next) => {


}

exports.isLoggedIn = (request, response, next) => {


}

exports.logout = (request, response, next) => {

    response.status(200).json({ message: "logout success" })

}

exports.restrictTo = (...roles) => {
    try {

        return (request, response, next) => {
            if (!roles.includes(request.user.role)) return response.status(400).json({ status: "you aren't authorized to perform this action" })

            next()
        }

    } catch (error) {
        response.status(400).json({
            status: "restrictTo fail"
        })
    }

}

exports.signup = async (request, response, next) => {
    try {

        console.log("Signup", request.body);

        response.status(200).json({
            message: "signup success"
        })

    } catch (error) {
        response.status(200).json({
            message: "signup fail"
        })
    }
}

exports.login = async (request, response, next) => {
    try {

        console.log("login: ", request.body);

        response.status(200).json({
            message: "login success"
        })

    } catch (error) {
        response.status(200).json({
            message: "login fail"
        })
    }
}

exports.forgotPassword = async (request, response, next) => {
    try {

    } catch (error) {

    }
}

exports.resetPassword = async (request, response, next) => {
    try {

    } catch (error) {

    }
}