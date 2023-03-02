const SubscriptionsModel = require("../models/SubscriptionsModel.js")
const DisputesModel = require("../models/disputesModel.js")
const ProductsModel = require("../models/ProductsModel.js")

exports.getHomePage = async (request, response, next) => {
    try {

        const productDocs = await ProductsModel.find({ productType: "shoe" })

        response.status(200).render("home", {
            payload: request.user,
            prodData: productDocs
        })

    } catch (error) {

        response.status(400).json({
            status: "getHomePage fail"
        })

    }
}

exports.getAuthPage = (request, response, next) => {
    try {
        response.status(200).render("auth")

    } catch (error) {
        response.status(400).json({
            status: "getAuthPage fail",

        })
    }
}


exports.getDashboardPage = async (request, response, next) => {
    try {


        let disputeDocs = null;

        if (request.user.role === "admin")
            disputeDocs = await DisputesModel.find();

        else if (request.user.role === "user")
            disputeDocs = await DisputesModel.find({ user: request.user.id });


        response.status(200).render("dashboard", {
            user: request.user,
            data: disputeDocs,
            token: request.authToken
        })

    } catch (error) {
        console.log(error);
        response.status(400).json({
            status: "getDashboardPage fail",

        })
    }
}


exports.getSubscriptionsPage = async (request, response, next) => {
    try {
        const prodDocs = await ProductsModel.find()

        response.status(200).render("subscriptions", {
            user: request.user,
            prods: prodDocs,
            token: request.authToken

        })

    } catch (error) {

        response.status(400).json({
            status: "getSubscriptionsPage fail"
        })

    }
}


exports.getOrderPage = async (request, response, next) => {
    try {

        const itemData = await ProductsModel.find({ name: request.params.productId })

        response.status(200).render("orderpage",
            {
                data: itemData[0],
                token: request.authToken

            })

    } catch (error) {
        console.log(error);
        response.status(400).json({
            status: "getOrderPage fail",

        })
    }
}


exports.getPurchasesPage = async (request, response, next) => {
    try {

        let subscriptionDocs = null;

        if (request.user.role === "user")

            subscriptionDocs = await SubscriptionsModel.find({ user: request.user.id })

        else if (request.user.role === "admin")

            subscriptionDocs = await SubscriptionsModel.find()

        response.status(200).render("purchases", {
            user: request.user,
            data: subscriptionDocs,
            token: request.authToken

        })

    } catch (error) {
        console.log(error);
        response.status(400).json({
            status: "getPurchasesPage fail",

        })
    }
}



exports.getSinglePurchasePage = async (request, response, next) => {
    try {

        const subscriptionDoc = await SubscriptionsModel.findById(request.params.id)

        response.status(200).render("purchase-detail", {
            user: request.user,
            data: subscriptionDoc,
            token: request.authToken

        })

    } catch (error) {
        console.log(error);
        response.status(400).json({
            status: "getPurchasesPage fail",

        })
    }
}


exports.getSingleDisputePage = async (request, response, next) => {
    try {

        const disputeDoc = await DisputesModel.findById(request.params.id)

        console.log(disputeDoc);

        response.status(200).render("dispute-detail", {
            user: request.user,
            data: disputeDoc,
            token: request.authToken

        })

    } catch (error) {
        console.log(error);
        response.status(400).json({
            status: "getPurchasesPage fail",

        })
    }
}
