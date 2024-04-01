const express = require("express")
const connectDb = require("./db.js")
const errorMiddleware = require("./Middleware/errorHandler.js")
const loginMathod = require("./RouteMethods/login.js")
const addConnection = require("./RouteMethods/addConnection.js")
const { validateSignUpInputs, validateAddConnectionInput } = require("./service/inputValidation.js")
const signUpMethod = require("./RouteMethods/login.js")
require('dotenv').config()

const app = express()

app.use(express.json())
connectDb();

// jwt token implementation middleaware
// send jwt from signup and login remaining
// zod verification remaining

app.post("/login", (req, res, next) => {

})

app.post("/signup", validateSignUpInputs, signUpMethod)
app.post("/addConnection", validateAddConnectionInput, addConnection)

app.get("/sendAlert", (req, res, next) => {

})

app.use(errorMiddleware)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`listning on port ${process.env.SERVER_PORT}`)
})