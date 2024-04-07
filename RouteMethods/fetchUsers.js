const User = require("../module/userModel")

const fetchAll = async (req, res, next) => {
    try{
        let users = await User.find({})
        users = users.map((curr) => {
            return {name : curr.name, emailId : curr.emailId}
        })
        res.send(users)
    }
    catch(error){
        next(error)
    }
}

const fetchUserByRegex = async (req, res, next) => {
    try{
        const search = req.query.search;
        let users = await User.find({ emailId: { $regex: search, $options: 'i' } })
        users = users.map((curr) => {
            return {name : curr.name, emailId : curr.emailId}
        })
        res.send(users)
    }
    catch(error){
        next(error)
    }
}

module.exports = {fetchAll, fetchUserByRegex}