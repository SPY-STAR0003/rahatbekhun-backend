const sharp = require("sharp");
const shortId = require('shortid');
const root = require('app-root-path');
const worksheet = require("../models/worksheet");


exports.addWorksheet = async (req, res, next) => {

    const {files, body} = req

    try {

        // TODO : Not define any pictures =======================
        if(files === null | !files) {
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
        worksheet.create({
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