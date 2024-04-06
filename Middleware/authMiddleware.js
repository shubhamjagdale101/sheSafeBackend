const jwt = require("jsonwebtoken")
require('dotenv').config()
const secretKey = process.env.JWT_SECRETE

const generateToken = (email) => {
    return jwt.sign({email}, secretKey, {expiresIn : '1d'})
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        try {
            const decoded = jwt.verify(token, secretKey);
            next();
        } catch (error) {
            return res.json({
                error : true,
                errorMessage : error.message
            });
        }
    } else {
        return res.status(404).json({
            error : true,
            errorMessage : 'unauthorized'
        });
    }
}


module.exports = {authMiddleware, generateToken}