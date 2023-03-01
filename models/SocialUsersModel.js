const mongoose = require("mongoose")
const validator = require("validator")

const SocialUsersSchema = mongoose.Schema(
    {
        gotten_id: {
            type: String,
            required: [true, "social user must have a sub"]
        },
        name: {
            type: String,
            required: [true, "social user must have a name"]
        },
        provider: {
            type: String,
            required: [true, "social user must have a provider"]
        },
        role: {
            type: String,
            default: "user",
            enum: {
                values: ["user", "admin"],
                message: "wrong role setting"
            }
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, "social user must have an email address"],
            validate: [validator.isEmail, "please profive a valid email address for social user"]
        },
    },
    {
        //allows virtual fields to show up in responses
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

const SocialUsersModel = mongoose.model("SocialUser", SocialUsersSchema)

module.exports = SocialUsersModel