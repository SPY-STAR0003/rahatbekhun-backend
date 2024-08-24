
const Video = require('../models/video');


exports.addVideo = async (req, res, next) => {

    const body = req.body

    try {
        
        // Validation ================================
        await Video.videoValidation(body)

        // Creation ==================================
        await Video.create(body)

        res.status(200).json({
            message : 'ویدیو با موفقیت به لیست ویدیوها اضافه شد !',
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}