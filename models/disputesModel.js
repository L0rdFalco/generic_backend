const mongoose = require("mongoose");

const disputesSchema = mongoose.Schema(
    {

        subscription: {
            type: mongoose.Schema.ObjectId,
            ref: "Subscription",
            required: [true, "dispute must be attached to a subscription"]
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "SocialUser",
            required: [true, "dispute must have a user id"]
        },
        disputeType: {
            type: String,
            required: [true, "dispute must be of a certain type"],
            enum: [
                "requestRefund",
                "cancelSubscription",
                "upgradeSubscription",
                "downgradeSubscription",
                "changeBillingCycle"
            ]

        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        resolvedAt: {
            type: Date
        },
        status: {
            type: String,
            default: "pending",
            enum: ["resolved", "rejected", "pending"]

        }
    },
    {
        //allows virtual fields to show up in responses
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })


disputesSchema.pre(/^find/, function (next) {

    this.populate({
        path: "user",
    })
    this.populate({
        path: "subscription"
    })

    next()

})

const disputesModel = mongoose.model("dispute", disputesSchema);

module.exports = disputesModel;