const User = require("../module/userModel");

const addConnection = async (req, res, next) => {
    try{
        const {emailId, connections} = req.body;
    
        const user = await User.findOne({emailId});
        const connectionList = user.connections;
    
        for(let i=0; i<connections.length; i++){
            const connEmailId = connections[i];
            const connUser = await User.findOne({emailId : connEmailId})
            console.log(connUser)
            if(!connUser){
                return res.status(404).json({ 
                    message: `${connEmailId} user not found`
                }); 
            }
    
            if(!connectionList.includes(connEmailId)){
                user.connections.push(connEmailId)
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

module.exports = addConnection