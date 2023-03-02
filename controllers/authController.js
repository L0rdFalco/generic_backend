const jwt = require("jsonwebtoken")
const UsersModel = require("../models/UsersModel.js")

exports.protect = (request, response, next) => {

    next()

}

exports.isLoggedIn = (request, response, next) => {

    next()

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

    /**
     * 1. make sure that there isnt another user with the same password
     * 2. make sure passwords match
     * 3. extract all required fields from request.body
     * 4. generate a JWT encoded with the id of the newly created user
     * 5. automatically log in user by sending said JWT in response
     */
    try {

        if (request.body.password !== request.body.passwordConfirm) {
            return response.status(400).json({ message: "passwords don't match" })
        }

        const user = await UsersModel.findOne({ email: request.body.email })

        if (user) return response.status(400).json({ messge: "user with that email already exists" })

        const authData = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            passwordConfirm: request.body.passwordConfirm
        }

        const newUser = await UsersModel.create(authData)

        newUser.password = undefined
        newUser.role = undefined
        newUser.isActive = undefined
        newUser.__v = undefined

        const authToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXP_IN + "d" })

        console.log(authToken);
        response.status(200).json({
            message: "signup success",
            token: authToken,
            payload: {
                userdata: newUser
            }
        })

    } catch (error) {
        response.status(200).json({
            message: "signup fail",

        })
    }
}

exports.login = async (request, response, next) => {
    try {
        /**
         * 1. check if both email and password are in the body
         * 2. find out if user with said credentials exists in the db
         * 3. check if provided credetials match those just queried
         * 4. if the above checks pass, sign a JWT and send it back as response
         * thereby signing in the user
         */

        const email = request.body.email
        const password = request.body.password

        if (!email || !password) return response.status(400).json({ message: "provide required info" })

        const queriedUser = await UsersModel.findOne({ email: email }).select("+password");

        const matches = await queriedUser.doPasswordsMatch(password, queriedUser.password)

        if (!matches) return response.status(400).json({ message: "incorrect password!" })

        const authToken = jwt.sign({ id: queriedUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXP_IN + "d" })

        response.status(200).json({
            message: "login success",
            token: authToken
        })

    } catch (error) {
        console.log(error);
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