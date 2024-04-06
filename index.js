const express = require("express")
const connectDb = require("./db.js")
const errorMiddleware = require("./Middleware/errorHandler.js")
const {addConnection, removeConnection} = require("./RouteMethods/addConnection.js")
const { validateSignUpInputs, validateAddConnectionInput, validateLoginInputs, validateSendAlertInputs } = require("./service/inputValidation.js")
const {signUpMethod, loginMethod} = require("./RouteMethods/login.js")
const {authMiddleware} = require("./Middleware/authMiddleware.js")
const sendAlertMethod = require("./RouteMethods/sendAlert.js")
require('dotenv').config()

const app = express()

app.use(express.json())
connectDb();

app.post("/login", validateLoginInputs, loginMethod)
app.post("/signup", validateSignUpInputs, signUpMethod)

app.use(authMiddleware)
app.post("/addConnection", validateAddConnectionInput, addConnection)
app.post("/removeConnection", validateAddConnectionInput, removeConnection)
app.post("/sendAlert", validateSendAlertInputs, sendAlertMethod)

app.use(errorMiddleware)
app.listen(process.env.SERVER_PORT, () => {
    console.log(`listning on port ${process.env.SERVER_PORT}`)
})