const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")

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

    password: {
        type: String,
        required: [true, "a user must have a password"],
        minLength: [6, "password must be at least 6 characters long"],
        select: false
    },

    passwordConfirm: {
        type: String,
        required: [true, "please repeat password"],
        validate: {
            validator: function (el) {
                return this.password === el
            },
            message: "passwords are not the same"
        }

    },
    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"],
            message: "wrong role setting"
        }
    },
    isActive: {
        type: Boolean,
        default: true,
        enum: {
            values: [true, false],
            message: "wrong value"
        },
        select: false
    },
    passwordChangedAt: Date

},
    {
        //allows virtual fields to show up in responses
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

//presave middleware used to encrypt passwords
//used in account creation and passwird update
UsersSchema.pre("save", async function (next) {
    //SKIP HASHING WHEN PASSWORD ISN'T BEING MODIFIED EG WHEN UPDATING PROFILE INFO
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined

    next()
})


//used in login and when updating passwords
UsersSchema.methods.doPasswordsMatch = async function (inputtedPW, savedPW) {

    return await bcrypt.compare(inputtedPW, savedPW)

}


UsersSchema.methods.passwordChangedAfter = function (tokenIssueDate) {
    //return true if token was issued after password was changed
    if (this.passwordChangedAt) return parseInt(this.passwordChangedAt.getTime() / 1000, 10) > tokenIssueDate

    //returning false means that the password was never changed because the field doesn't exist
    return false;
}

const UsersModel = mongoose.model("User", UsersSchema)

module.exports = UsersModel;