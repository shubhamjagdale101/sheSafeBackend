const mongoose = require("mongoose")
require('dotenv').config()

const uri = process.env.MONGODB_URI

const connectDb = async() => {
    try{
        const conn = await mongoose.connect(uri)
        console.log(`successfully connected to mongoDB`);
    }
    catch(error){
        console.log(`error: ${error.message}`);
        process.exit()
    }
}

module.exports = connectDb