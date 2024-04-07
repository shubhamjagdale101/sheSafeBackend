const errorMiddleware = (err, req, res, next) => {
    res.json({
        error : true,
        message : err.message
    })
}

module.exports = errorMiddleware;