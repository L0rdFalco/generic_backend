const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const authController = require("../controllers/authController.js")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/users/googlecloud-webhook"
}, authController.passportCallback))

passport.serializeUser(authController.passportSelializeUser)
passport.deserializeUser(authController.passportDeselializeUser)
