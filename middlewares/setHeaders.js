

exports.setHeaders = (req, res, next) => {
    res.setHeader("access-control-allow-origin", "*")
    res.setHeader("access-control-allow-methods", "*")
    res.setHeader("access-control-allow-headers", "Content-Type, authorization")

    next()
}