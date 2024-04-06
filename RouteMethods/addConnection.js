const User = require("../module/userModel");

const addConnection = async (req, res, next) => {
    try{
        const {emailId, connections} = req.body;
    
        const user = await User.findOne({emailId});
        if(!user){
            res.json({
                error : true,
                messsage : `user with emailId : ${emailId} not found`
            })
        }
    
        for(let connEmailId of connections){
            const connUser = await User.findOne({emailId : connEmailId})
            console.log("add conn email : ",connUser)
            if(!connUser){
                return res.status(404).json({ 
                    message: `${connEmailId} user not found`
                }); 
            }
    
            if (!user.connections.includes(connEmailId)) {
                user.connections.push(connEmailId);
            }
        }
    
        user.save();
        return res.status(200).json({
            message : "all connections added successfully"
        })
    }
    catch(error){
        next(error)
    }
}

const removeConnection = async (req, res, next) => {
    try {
        const { emailId, connections } = req.body;

        const user = await User.findOne({ emailId });
        const connectionList = user.connections;

        for (let i = 0; i < connections.length; i++) {
            const connEmailId = connections[i];
            const index = connectionList.indexOf(connEmailId);
            if (index !== -1) {
                connectionList.splice(index, 1);
            } else {
                return res.status(404).json({ 
                    message: `${connEmailId} connection not found`
                });
            }
        }

        await user.save();
        return res.status(200).json({
            message: "Connections removed successfully"
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {addConnection, removeConnection}