const express = require("express");
const morgan = require("morgan")

const path = require("path");

const viewsRouter = require("./routers/viewsRouter.js")
const purchasesRouter = require("./routers/purchasesRouter.js")
const usersRouter = require("./routers/usersRouter.js")
const disputesRouter = require("./routers/disputesRouter.js")
const webhooksRouter = require("./routers/webhooksRouter.js")

const app = express();


app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

//glonal middlware for logging
app.use(morgan("dev"))

//global middleware for adding body data to request object
//also called BODY PARSER
app.use(express.json({
    limit: "300kb"// limits the size of request data
}))

app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.use((request, response, next) => {
    // console.log("my custom middleware", request.originalUrl, ":", request.body, ":", request.method);
    request.reqTime = Date.now()

    next()
})


app.use("/", viewsRouter)
app.use("/users", usersRouter)
app.use("/purchases", purchasesRouter)
app.use("/disputes", disputesRouter)
app.use("/webhooks", webhooksRouter)

app.all("*", (request, response, next) => {
    //one way of handling errors
    response.status(400).json({
        status: "fail",
        message: `cannot find the path: ${request.originalUrl} on this server`
    })
    next()
})

module.exports = app;