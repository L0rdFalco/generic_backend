const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: `./config.env` })

mongoose.set('strictQuery', true);

const app = require("./app.js")

mongoose.connect(process.env.MONGO_DB_STR).then(() => {
    console.log("Webstoretesterslimited db connected!");
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`extension backend listening on port ${port}`);
})