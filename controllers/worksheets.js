const sharp = require("sharp");
const shortId = require('shortid');
const root = require('app-root-path');
const worksheet = require("../models/worksheet");
const colors = require('colors');
const fs = require('fs');
const Worksheet = require("../models/worksheet");

exports.addWorksheet = async (req, res, next) => {

    const {files, body} = req
    console.log(colors.red(body))

    try {

        // Not define any pictures ===================
        if(body['images'] === null | !body['images']) {
            console.log(colors.bgRed(`files = ${files}`))
            const err = new Error('pictures')
            err.data = [{field : 'pictures', message : 'عکسی بارگذاری نکرده اید !'}]
            err.status = 401;
            throw err;
        }

        // Get Hashtags ============================== 
        const newBody = Object.keys(body)
            .filter(item => item !== 'hashtags[]')
            .reduce((newObj, key) =>
            {
                newObj[key] = body[key];
                return newObj;
            }, { hashtags : body['hashtags[]'] })
    
        if(typeof newBody.hashtags === 'string') newBody.hashtags = [newBody.hashtags]

        // Validation ================================
        await worksheet.worksheetValidation(newBody)

        // Creation ==================================

        worksheet.create(newBody)

        res.status(200).json({
            message : "done"
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

exports.showList = async (req, res, next) => {

    try {
        const perPage = Number(req.query.per_page) || 0
        const page = Number(req.query.page) || 1
        const documents = await worksheet.find().countDocuments()
        
        const totalPages = Math.ceil(documents/perPage)

        const worksheets = await worksheet.find().skip((page-1)*perPage).limit(perPage)

        res.status(200).json({
            message : 'کاربرگ ها با موفقیت دریافت شدند !',
            totalPages,
            data : worksheets,
        })
    } catch (err) {
        next(err)
    }
}

exports.deleteWorksheet = async (req, res, next) => {
    
    try {

        const {id} = req.query

        if(!id) {
            const err = new Error('کاربرگی یافت نشد !')
            err.status = 404;
            throw err
        }

        await worksheet.findByIdAndDelete(id)

        res.status(200).json({
            message : "کاربرگ با موفقیت حذف گردید !"
        })
    } catch (err) {
        err.message.includes('Cast to ObjectId failed for value')
        ? res.status(400).json({message : "مشکلی در درخواست شما وجود دارد !"})
        : next(err)
    }
}

exports.editWorksheet = async (req, res, next) => {

    try {
        const { id } = req.query

        if(!id) {
            const err = new Error('شناسه معتبری یافت نشد !')
            err.status = 404;
            throw err
        }

        const editedWorksheet = await worksheet.findById(id).catch(error => {
            const err = new Error('کاربرگی با این مشخصات یافت نشد !')
            err.status = 404;
            err.data = error
            throw err
        })

        res.status(200).json({
            message : 'اطلاعات کاربرگ انتخابی با موفقیت دریافت شد !',
            data : editedWorksheet
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.setEditedWorksheet = async (req, res, next) => {
    const {files, body} = req

    // const ffff = []

    console.log(body)
    
    // Object.entries(body).forEach((item, index) => {
    //     if(item[0].includes('files')) {
    //         ffff.push({file : 1, name : item[1]})
    //     }
    // })

    // console.log(ffff)

    try {
        
        // TODO : Not define any pictures =======================
        if(files === null) {
            const err = new Error('pictures')
            err.data = [{field : 'pictures', message : 'عکسی بارگذاری نکرده اید !'}]
            err.status = 401;
            throw err;
        }

        // TODO : Get Hashtags ==================================    
        const newBody = Object.keys(body)
            .filter(item => item !== 'hashtags[]')
            .reduce((newObj, key) =>
            {
                newObj[key] = body[key];
                return newObj;
            }, { hashtags : body['hashtags[]'] })
    
        if(typeof newBody.hashtags === 'string') newBody.hashtags = [newBody.hashtags]
    
        // TODO : Get Images ====================================
        const uploadedImages = Object.values(files)[0].length
            ? Object.values(files)[0]
            : [Object.values(files)[0]]

        // TODO : Validation ================================
        await worksheet.worksheetValidation({...newBody, pictures : uploadedImages})

        // TODO : Make Images Ready ! =======================
        const picturesFolder = []

        uploadedImages.forEach(async (picture, index) => {          
            const name = `${shortId.generate()}_${picture.name}`
            const path = `${root}/public/uploads/worksheets/${name}`
            
            picturesFolder.push({file : index, name})

            await sharp(picture.data)
            .jpeg({quality : 60})
            .toFile(path)
            .catch((err) => {
                console.log(err)
            })
        });

        // TODO : Creation ==================================

        await worksheet.findByIdAndUpdate({_id : newBody._id}, {
            ...newBody,
            pictures : picturesFolder
        })

        res.status(200).json({
            message : "done"
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

exports.uploadPictures = async (req, res, next) => {
}

exports.upload = async (req, res, next) => {

    const files = Object.values(req.files)[0]

    const images = Array.isArray(files)
        ? files 
        : [files]

        
    try {

        const links = await Promise.all(images.map( async (image) => {

            const name = `worksheet_name=${shortId.generate()}_${image.name}`
            const path = `${root}/public/uploads/worksheets/${name}`
    
            await sharp(image.data)
            .jpeg({quality : 60})
            .toFile(path)
            .catch((err) => {
                console.log(err)
            })

            return `http://localhost:5000/uploads/worksheets/${name}`
        }))

        res.status(200).json({
            message : 'عکس با موفقیت آپلود شد !',
            links
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.deleteUploadedPicture = async (req, res, next) => {

    const { image, id } = req.body
        
    try {

        let newImages;

        if(!image) {
                const err = new Error("چنین تصویری یافت نشد")
                err.status = 404
                throw err
            }
        
        // ! if ID has defined means we are editing a worksheet ...
        if(id) {
            const worksheet = await Worksheet.findById(id)
            const worksheetImages = await JSON.parse(worksheet.images)
            const deletedImage = `http://localhost:5000/uploads/worksheets/${image}`

            newImages = await JSON.stringify(worksheetImages.filter((item) => item !== deletedImage))

            await Worksheet.findByIdAndUpdate(id, {images : newImages})
            fs.unlink(`public/uploads/worksheets/${image}`, err => err && console.log(err))

            res.status(200).json({
                message : "فایل با موفقیت حذف شد !",
                newImages
            })

            res.end()
        } else {
            fs.unlink(`public/uploads/worksheets/${image}`, err => err && console.log(err))

            res.status(201).json({
                message : "فایل با موفقیت حذف شد !",
            })
        }
    } catch (err) {
        next(err)
    }
}