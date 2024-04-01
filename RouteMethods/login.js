const {otpStore, clearOtpAfterTimeOut} = require("../module/otp");
const User = require("../module/userModel");
const sendMail = require("../service/mailService");

const signUpMethod = async (req, res, next) => {
    try{
        const {emailId, password, otp, connections} = req.body;
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
            // sendMail(emailId, "OTP for account creation from SheSafe", `your one time password for account creation is : ${otpStore.getOtp(emailId).otp}`)
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
        
        otpStore.clearOtp(emailId)

        user = new User({
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

module.exports = signUpMethod