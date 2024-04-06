const User = require("../module/userModel");
const { mailBodyGeneratorForLocationUpdate } = require("../service/mailBodyGenerator");
const sendMail = require("../service/mailService");

const sendAlertMethod = async (req, res, next) => {
    try{
        const {emailId, latitude, longitude} = req.body;
    
        const user = await User.findOne({emailId});
        const connectionList = user.connections;

        console.log(user);
    
        for(let connEmail of connectionList){
            const connUser = await User.findOne({emailId : connEmail});
            if(!connUser) continue;

            sendMail(connEmail, "Location Update", mailBodyGeneratorForLocationUpdate(latitude, longitude, user.name, connUser.name));
        }

        res.json({
            message : "email sennt to all connection successfully"
        })
    }
    catch(error){
        next(error)
    }
}

module.exports = sendAlertMethod