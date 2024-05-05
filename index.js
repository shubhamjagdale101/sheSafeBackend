const express = require("express")
const connectDb = require("./db.js")
const errorMiddleware = require("./Middleware/errorHandler.js")
const {addConnection, removeConnection} = require("./RouteMethods/addConnection.js")
const { validateSignUpInputs, validateAddConnectionInput, validateLoginInputs, validateSendAlertInputs } = require("./service/inputValidation.js")
const {signUpMethod, loginMethod} = require("./RouteMethods/login.js")
const {authMiddleware, generateToken} = require("./Middleware/authMiddleware.js")
const sendAlertMethod = require("./RouteMethods/sendAlert.js")
const { fetchAll, fetchUserByRegex } = require("./RouteMethods/fetchUsers.js")
const { request_get_auth_code_url, get_access_token, get_profile_data } = require("./service/utils.js")
const User = require("./module/userModel.js")
require('dotenv').config()

const app = express()

app.use(express.json())
connectDb();

app.get ('/auth', async (req, res) => {
    try {
        console.log(request_get_auth_code_url);
        res.redirect (request_get_auth_code_url);
    } catch (error) {
      res.sendStatus (500);
      console.log (error.message);
    }
});

app.get (process.env.REDIRECT_URI, async (req, res) => {
    const authorization_token = req.query.code;
    console.log(authorization_token)

    try{
        const response = await get_access_token(authorization_token);
        // console.log ({data: response.data, res : response});

        // throw new Error("meri merji");

        const profile = await get_profile_data(response.data)
            // .then(profile => {
            //     this.emailId = profile.email;
            //     console.log('User profile:', profile);
            // })
            // .catch(error => {
            //     console.error('Error:', error.message);
            // });
        
        // if(emailId == null || emailId == undefined){
        //     res.send("your github account doesn't contain email");
        //     return;
        // }
        const emailId = profile.email;
        console.log(emailId)
        console.log(profile)

        let user = await User.findOne({emailId});
        if(!user)  return res.redirect("https://www.google.com");

        return res.json({
            email : user.emailId,
            token : generateToken(user.emailId)
        })
    }
    catch(err){
        res.json({error : true, msg : err.message})
    }
});

app.post("/login", validateLoginInputs, loginMethod)
app.post("/signup", validateSignUpInputs, signUpMethod)

app.use(authMiddleware)
app.get("/allUsers", fetchAll)
app.get("/getUser", fetchUserByRegex)
app.post("/addConnection", validateAddConnectionInput, addConnection)
app.post("/removeConnection", validateAddConnectionInput, removeConnection)
app.post("/sendAlert", validateSendAlertInputs, sendAlertMethod)

app.use(errorMiddleware)
app.listen(process.env.SERVER_PORT, () => {
    console.log(`listning on port ${process.env.SERVER_PORT}`)
})