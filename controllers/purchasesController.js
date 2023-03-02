const axios = require("axios")
const SubscriptionsModel = require("../models/SubscriptionsModel.js")
const ProductsModel = require("../models/ProductsModel.js")

exports.createOrder = async (request, response, next) => {

    let cOrderRes = null;
    try {

        const productData = await ProductsModel.find({ name: request.body.productName })

        const url = `${process.env.base}/v2/checkout/orders`
        const tokenObj = await generateAccessToken()

        cOrderRes = await axios({
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenObj.access_token}`
            },

            data: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: `${productData[0].price}`,
                        }
                    }
                ],

            })

        })

        // console.log("order obj", cOrderRes.data);

        response.status(200).json({
            status: "createOrder success",
            data: cOrderRes.data
        })

    } catch (error) {
        console.log("createOrder failed");
        response.status(400).json({
            status: "createOrder fail",
            data: cOrderRes.data
        })
    }

}


exports.capturePayment = async (request, response, next) => {

    try {

        const orderId = request.params.orderID;
        const tokenObj = await generateAccessToken()
        const url = `${process.env.base}/v2/checkout/orders/${orderId}/capture`;

        const cPaymentObj = await axios({
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenObj.access_token}`
            }
        })

        //create subscription in db. To be replaced with webhooks later
        const productData = await ProductsModel.find({ name: request.body.productName })
        const subscriptionDoc = await SubscriptionsModel.create({
            product: productData[0].id,
            user: request.user.id,
            price: productData[0].price,
            paymentCycle: productData[0].paymentCycle,
            paypayCaptureId: cPaymentObj.data.id

        })


        // console.log("capture Obj", cPaymentObj.data);
        response.status(200).json({
            status: "capture payment success",
            data: cPaymentObj.data
        })


    } catch (error) {
        console.log(error);

        console.log("capture payment failed ");
        response.status(400).json({
            status: "capture payment fail",
        })

    }

}

async function generateAccessToken() {

    try {
        const response = await axios({
            url: `${process.env.base}/v1/oauth2/token`,
            method: "POST",
            data: "grant_type=client_credentials",
            auth: {
                username: process.env.PP_CLIENT_ID,
                password: process.env.PP_CLIENT_SECRET
            }
        })

        return response.data
    } catch (error) {
        console.log("generateAccessToken failed");
    }

}