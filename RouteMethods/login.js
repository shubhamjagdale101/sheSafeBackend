const bcrypt = require("bcrypt");
const {otpStore, clearOtpAfterTimeOut} = require("../module/otp");
const User = require("../module/userModel");
const sendMail = require("../service/mailService");
const { generateToken } = require("../Middleware/authMiddleware");
const {generateMailBodyForOTP} = require("../service/mailBodyGenerator");
require('dotenv').config()

const signUpMethod = async (req, res, next) => {
    try{
        const {credentials, otp, connections} = req.body;
        const {emailId, password, name} = credentials;
        let user = await User.findOne({emailId});

        console.log(user)
        if(user){
            return res.status(404).json({ 
                message: 'user alrady exist'
            }); 
        }

        if(!otp || !otpStore.cheak(emailId)){
            otpStore.pushToStore(emailId)
            console.log("to signup")
            sendMail(emailId, "OTP for account creation from SheSafe", generateMailBodyForOTP(otpStore.getOtp(emailId).otp, process.env.OTP_EXP_TIME))
            console.log(otpStore.getOtp(emailId).otp)
            return res.status(404).json({ 
                message: 'OTP is sent to respective email address'
            });
        }


        if(!otpStore.compareOtp(emailId, otp)){
            return res.status(404).json({ 
                message: 'provided otp is not correct'
            }); 
        }

        for(let i=0; i<connections.length; i++){
            const connEmailId = connections[i];
            const connUser = await User.findOne({emailId : connEmailId})
            console.log(connUser)
            if(!connUser){
                return res.status(404).json({ 
                    message: `${connEmailId} user not found`
                }); 
            }
        }

        user = new User({
            name,
            emailId,
            password,
            connections
        });
    
        user.save()
        res.status(200).json({
            message : "account created successfuly"
        })
    }
    catch(err) {
        next(err)
    }
}

const loginMethod = async (req, res, next) => {
    try {
        const { emailId, password} = req.body;
        const user = await User.findOne({ emailId });

        const match = await user.matchPassword(password);
        if(match) return res.json({
            email : user.emailId,
            token : generateToken(user.emailId)
        })
        else return res.json({
            message : "unable to unauthenticated"
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {signUpMethod, loginMethod}