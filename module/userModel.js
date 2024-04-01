const mongoose = require('mongoose')
const { string } = require('zod')

const userSchema = mongoose.Schema(
    {
        emailId : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        connections : {
            type : []
        }
    },  
    {
        timeStamps : true 
    }
)

const User = mongoose.model('user', userSchema)
module.exports = User