const sharp = require("sharp");
const shortId = require('shortid');
const root = require('app-root-path');
const fs = require('fs');
const Worksheet = require("../models/worksheet");

exports.pdfUpload = async (req, res, next) => {

    const token = req?.body?.headers?.authorization ?? req?.get('cookie')?.split('rahatbekhun-user-token=')[1]

    try {
        const file = req.files.pdf
        const fileName = `pdf_name=${shortId.generate()}_${file.name}`
        const filePath = `${root}/public/uploads/worksheets/pdfs/${fileName}`

        if(!token) {
            const err = new Error('شما ابتدا باید وارد سایت شوید !')
            err.status = 401
            throw err
        }

        if(!file || !fileName) {
            const err = new Error('هیچ فایلی در نظر گرفته نشده است !')
            err.status = 401
            throw err
        }
    
        fs.writeFileSync(filePath, file.data)
    
        res.status(200).json({
            message : 'successful',
            link : `https://rahatbekhun.ir/uploads/worksheets/pdf/${fileName}`
        })

    } catch (err) {
        console.log(err)
        next(err)
    }

}

exports.upload = async (req, res, next) => {

    const token = req?.body?.headers?.authorization ?? req?.get('cookie')?.split('rahatbekhun-user-token=')[1]
    const image = req.files.image

    try {

        if(!token) {
            const err = new Error('شما ابتدا باید وارد سایت شوید !')
            err.status = 401
            throw err
        }

        const name = `worksheet_name=${shortId.generate()}_${image.name}`
        const path = `${root}/public/uploads/worksheets/images/${name}`

        await sharp(image.data)
            .jpeg({quality : 60})
            .toFile(path)
            .catch((err) => {
                console.log(err)
            })

        res.status(200).json({
            message : 'عکس با موفقیت آپلود شد !',
            link : `http://rahatbekhun.ir/uploads/worksheets/images/${name}`
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.deleteUploadedPicture = async (req, res, next) => {

    const { image } = req.body
        
    try {

        if(!image) {
            const err = new Error("چنین تصویری یافت نشد")
            err.status = 404
            throw err
        }

        fs.unlink(`public/uploads/worksheets/images/${image}`, err => err && console.log(err))

        res.status(200).json({
            message : "فایل با موفقیت حذف شد !",
        })

    } catch (err) {
        next(err)
    }
}

exports.courseCoverUpload = async (req, res, next) => {
    
    const image = req.files.image

    try {
        const name = `course_cover_name=${shortId.generate()}_${image.name}`
        const path = `${root}/public/uploads/courses/covers/${name}`

        await sharp(image.data)
            .jpeg({quality : 60})
            .toFile(path)
            .catch((err) => {
                console.log(err)
            })

        res.status(200).json({
            message : 'عکس با موفقیت آپلود شد !',
            link : `http://localhost:5000/uploads/courses/covers/${name}`
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}