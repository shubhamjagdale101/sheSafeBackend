const otpGenerator = require("otp-generator")
require('dotenv').config()
const mp = new Map()

const generateOtp = (len) => {
    return otpGenerator.generate(+len, { upperCase: false, specialChars: false, alphabets: false, digits : true });
}

const clearOtpAfterTimeOut = async (key) => {
    setTimeout((key) => {
        console.log("delete")
        mp.delete(key)
    }, 30000)
}

const otpStore = {
    cheak : (key) => {
        return mp.has(key);
    },
    pushToStore : async (key) => {
        const otp = generateOtp(process.env.OTP_LEN);
        mp.set(key, {otp});
    },
    compareOtp : (key, otp) => {
        const storedOtp = mp.get(key);
        let res = storedOtp && storedOtp.otp === otp;
        return res;
    },
    getOtp : (key) => {
        console.log(mp.get(key))
        return mp.get(key);
    },
    clearOtp : (key) => {
        mp.delete(key)
    }
}

module.exports = {otpStore, clearOtpAfterTimeOut};