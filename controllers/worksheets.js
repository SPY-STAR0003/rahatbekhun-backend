const worksheet = require("../models/worksheet");

exports.addWorksheet = async (req, res, next) => {

    const {files, body} = req

    try {

        // Not define any pictures ===================
        if(body['image'] === null | !body['image']) {
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
        await worksheet.create(newBody)

        res.status(200).json({
            message : "done"
        })

    } catch (err) {
        if(err.inner) {
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

    console.log("first")

    const {body} = req

    try {
        
        // TODO : Not define any pictures =======================
        if(body['image'] === null | !body['image']) {
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

        // TODO : Validation ================================
        await worksheet.worksheetValidation({...newBody})

        // TODO : Creation ==================================

        await worksheet.findByIdAndUpdate({_id : newBody._id}, {
            ...newBody,
        })

        res.status(200).json({
            message : "کاربرگ با موفقیت ویرایش شد !"
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