const User = require("../models/user");

exports.addUser = async (req, res, next) => {

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

    let {page, per_page, sort, price, ...props} = req.query

    try {
        const perPage = Number(per_page) || 6
        const pageNum = Number(page) || 1
        
        if(price === 'فقط رایگان')
            props = {...props, price : '0'}
        
        let documents = await User.find(props).countDocuments()
        let users = await User.find(props).skip((pageNum-1)*perPage).limit(perPage)

        const totalPages = Math.ceil(documents/perPage)

        res.status(200).json({
            message : 'کاربر ها با موفقیت دریافت شدند !',
            totalPages,
            data : users,
        })
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    
    try {

        const {id} = req.query

        if(!id) {
            const err = new Error('کاربری یافت نشد !')
            err.status = 404;
            throw err
        }

        await worksheet.findByIdAndDelete(id)

        res.status(200).json({
            message : "کاربر با موفقیت حذف گردید !"
        })
    } catch (err) {
        err.message.includes('Cast to ObjectId failed for value')
        ? res.status(400).json({message : "مشکلی در درخواست شما وجود دارد !"})
        : next(err)
    }
}

exports.editUser = async (req, res, next) => {

    try {
        const { id } = req.query

        if(!id) {
            const err = new Error('شناسه معتبری یافت نشد !')
            err.status = 404;
            throw err
        }

        const editedWorksheet = await worksheet.findById(id).catch(error => {
            const err = new Error('کاربری با این مشخصات یافت نشد !')
            err.status = 404;
            err.data = error
            throw err
        })

        res.status(200).json({
            message : 'اطلاعات کاربر انتخابی با موفقیت دریافت شد !',
            data : editedWorksheet
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.setEditedUser = async (req, res, next) => {

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
            message : "کاربر با موفقیت ویرایش شد !"
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

exports.singleUser = async (req, res, next) => {

    try {

        const id = req?.query?.id

        if(!id) {
            const err = new Error('هیج آیدی مناسبی یافت نشد !')
            err.status = 401
            throw err
        }

        const foundedWorksheet = await worksheet.findById(id)

        if(!foundedWorksheet) {
            const err = new Error('هیج کاربری متناسب با درخواست شما یافت نشد !')
            err.status = 401
            throw err
        }
        
        res.status(200).json({
            data : foundedWorksheet,
            message : "اطلاعات با موفقیت دریافت شدند !"
        })
        
    } catch (err) {
        console.log(err)
        next(err)
    }
}