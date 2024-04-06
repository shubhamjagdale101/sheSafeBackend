const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password);
}

const User = mongoose.model('user', userSchema)
module.exports = User