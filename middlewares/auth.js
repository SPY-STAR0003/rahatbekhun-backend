

const jwt = require("jsonwebtoken")

exports.auth = async (req, res, next) => {

    const authHeader = req.get('authorization')

    try {
        if(!authHeader) {
            const err = new Error("شما اجازه دسترسی به سایت را ندارید !")
            err.statusCode = 401;
            throw err
        }
        
        const decodedToken = await jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET)

        if(!decodedToken) {
            const err = new Error("شما اجازه دسترسی به سایت را ندارید !")
            err.statusCode = 401;
            throw err
        }

        req.userId = decodedToken.user.userId;
        
        next();
    } catch (err) {
        next(err)
    }
}