const errorMiddleware = (err, req, res) => {
    res.json({
        error : true,
        message : err.message
    })
}

module.exports = errorMiddleware;