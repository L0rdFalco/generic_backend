const { default: mongoose } = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: `../config.env` })

const ProductsModel = require("../models/ProductsModel.js")

const getProductData = () => {
    let productData = {
        shoes: {
            shoe1: {
                id: "93850483043451",
                name: "shoe1",
                price: 439
            },
            shoe2: {
                id: "93850483043452",
                name: "shoe2",
                price: 439
            },
            shoe3: {
                id: "93850483043453",
                name: "shoe3",
                price: 439
            },
            shoe4: {
                id: "9385048304344",
                name: "shoe4",
                price: 439
            },
            shoe5: {
                id: "9385048304345",
                name: "shoe5",
                price: 439
            },
            shoe6: {
                id: "9385048304346",
                name: "shoe6",
                price: 439
            },
            shoe7: {
                id: "9385048304347",
                name: "shoe7",
                price: 439
            },
            shoe8: {
                id: "9385048304348",
                name: "shoe8",
                price: 439
            },
            shoe9: {
                id: "9385048304349",
                name: "shoe9",
                price: 439
            },

            shoe10: {
                id: "93850483043410",
                name: "shoe10",
                price: 439
            }


        },
        consultancyPackages: {
            professional: {
                id: "1385048304349",
                name: "professional",
                price: 531
            },

            standard: {
                id: "23850483043410",
                name: "standard",
                price: 632
            },
            premium: {
                id: "3385048304345",
                name: "premium",
                price: 733
            },
        },
        trainingPackages: {
            basic: {
                id: "12385048304349",
                name: "basic",
                price: 841
            },

            popular: {
                id: "233850483043410",
                name: "popular",
                price: 742
            },
            blaze: {
                id: "4585048304345",
                name: "blaze",
                price: 643
            },
        }

    }

    return productData
}

exports.getSingleProduct = (item, sentId) => {


    const allData = getProductData()

    for (const key in allData) {
        if (key === item) {
            const requiredObj = allData[key]
            for (const ObjKey in requiredObj) {
                if (Number(requiredObj[ObjKey].id) === sentId) {
                    return requiredObj[ObjKey]
                }

            }




        }
    }

    return null

}


async function uploadSingleProduct() {
    try {

        mongoose.set("strictQuery", true)

        let connectRes = await mongoose.connect(process.env.MONGO_DB_STR)


        const singleProdObj = {
            productType: "three",
            name: `3`,
            price: 40,
            paymentCycle: "recurring",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.",
            features: [

                "feature 1",
                "feature 2",
                "feature 3",
                "feature 4",
                "feature 5",

            ]

        }

        const sProd = await ProductsModel.create(singleProdObj)

        console.log(sProd);



    } catch (error) {
        console.log(error);

    }



}

// uploadSingleProduct()





