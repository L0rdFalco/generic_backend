const mongoose = require("mongoose");
const validator = require("validator")

const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "user must have a name"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "user must have an email address"],
        validate: [validator.isEmail, "please provide a valid email address for user"]
    },
    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"],
            message: "wrong role setting"
        }
    },

},
    {
        //allows virtual fields to show up in responses
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

const UsersModel = mongoose.model("User", UsersSchema)

module.exports = UsersModel;