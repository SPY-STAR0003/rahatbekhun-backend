
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

exports.editVideo = async (req, res, next) => {

    console.log(req)

    try {
        const { id } = req.query

        if(!id) {
            const err = new Error('شناسه معتبری یافت نشد !')
            err.status = 404;
            throw err
        }

        const video = await Video.findById(id).catch(error => {
            const err = new Error('ویدیویی با این مشخصات یافت نشد !')
            err.status = 404;
            err.data = error
            throw err
        })

        res.status(200).json({
            message : 'اطلاعات ویدیوی انتخابی با موفقیت دریافت شد !',
            data : video
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.setEditedVideo = async (req, res, next) => {

    const {body} = req

    try {

        // TODO : Validation ================================
        await Video.videoValidation(body)

        // TODO : Creation ==================================

        await Video.findByIdAndUpdate({_id : body._id}, body)

        res.status(200).json({
            message : "ویدیو با موفقیت ویرایش شد !"
        })

    } catch (err) {
        if(err.errors) {
            const data = err.inner.map((item) => {
                return {field : item.path, message : item.errors[0]}
            })
            const error = new Error('information')
            error.status = 401;
            error.data = data;
            next(error)
        } else {
            next(err)
        }
        next(err)
    }
}