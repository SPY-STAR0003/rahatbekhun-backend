

exports.errorHandler = (error, req, res, next) => {

    const status = error.status || 500

    const {message, data} = error

    res.status(status).json({message, data})
}