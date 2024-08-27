
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

exports.videosList = async (req, res, next) => {

    let {page, per_page, sort, price, ...props} = req.query

    try {
        const perPage = Number(per_page) || 6
        const pageNum = Number(page) || 1
        
        if(price === 'فقط رایگان')
            props = {...props, price : '0'}
        
        let documents = await Video.find(props).countDocuments()
        let worksheets = await Video.find(props).skip((pageNum-1)*perPage).limit(perPage)

        const totalPages = Math.ceil(documents/perPage)

        res.status(200).json({
            message : 'ویدیو ها با موفقیت دریافت شدند !',
            totalPages,
            data : worksheets,
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.deleteVideo = async (req, res, next) => {
    
    try {

        const {id} = req.query

        if(!id) {
            const err = new Error('کاربرگی یافت نشد !')
            err.status = 404;
            throw err
        }

        await Video.findByIdAndDelete(id)

        res.status(200).json({
            message : "کاربرگ با موفقیت حذف گردید !"
        })
    } catch (err) {
        err.message.includes('Cast to ObjectId failed for value')
            ? res.status(400).json({message : "مشکلی در درخواست شما وجود دارد !"})
            : next(err)
    }
}