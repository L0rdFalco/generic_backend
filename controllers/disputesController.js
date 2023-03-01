const disputesModel = require("../models/disputesModel.js")

async function disputeAction(disputeType, req, res) {
    const extractedDisputeDoc = await disputesModel.find({ disputeType: disputeType, subscription: req.body.subscriptionId, user: req.user })

    if (extractedDisputeDoc.length > 0) return res.status(200).json({ status: `you have already done a ${disputeType}. No need to repeat!` })

    const newDisputesDoc = await disputesModel.create({
        subscription: req.body.subscriptionId,
        user: req.user.id,
        disputeType: disputeType,
    })

    res.status(200).json({ status: "requestRefund success" })
}

exports.requestRefund = async (request, response, next) => {

    try {

        await disputeAction("requestRefund", request, response)

    } catch (error) {
        response.status(400).json({ status: "requestRefund fail" })

    }

}

exports.upgradeSubscription = async (request, response, next) => {
    try {

        await disputeAction("upgradeSubscription", request, response)


    } catch (error) {
        response.status(400).json({ status: "upgradeSubscription fail" })

    }

}

exports.downgradeSubscription = async (request, response, next) => {
    try {

        await disputeAction("downgradeSubscription", request, response)

    } catch (error) {
        response.status(400).json({ status: "downgradeSubscription fail" })

    }

}
exports.cancelSubscription = async (request, response, next) => {
    try {

        await disputeAction("cancelSubscription", request, response)

    } catch (error) {
        response.status(400).json({ status: "cancelSubscription fail" })

    }

}
exports.changeBillingCycle = async (request, response, next) => {
    try {

        await disputeAction("changeBillingCycle", request, response)


    } catch (error) {
        response.status(400).json({ status: "changeBillingCycle fail" })

    }

}