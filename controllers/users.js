const User = require("../models/user");
const bcrypt = require('bcryptjs');

exports.addUser = async (req, res, next) => {

    const {body} = req

    try {

        // Validation ================================
        await User.userValidation(body)

        // Creation ==================================
        await User.create(body)

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

        await User.findByIdAndDelete(id)

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

        let selectedUser = await User.findById(id).catch(error => {
            const err = new Error('کاربری با این مشخصات یافت نشد !')
            err.status = 404;
            err.data = error
            throw err
        })

        let user = {};

        Object.entries(selectedUser._doc)
            .filter(item => item[0] !== 'password')
            .forEach((item) => {
                user[item[0]] = item[1]
            })

        res.status(200).json({
            message : 'اطلاعات کاربر انتخابی با موفقیت دریافت شد !',
            data : user
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.setEditedUser = async (req, res, next) => {

    const {body} = req

    try {

        let password = body?._id
        let repeat = body?._id

        if(password && password !== repeat) {
            const err = new Error('رمزعبور با تکرار آن یکسان نیست !')
            err.status = 401;
            throw err;
        }

        if(!body.password) {
            let user = await User.findById(body?._id)
            password = user?.password
        }

        // TODO : Validation ================================
        await User.userValidation({
            ...body,
            password,
            repeat : password
        })

        // TODO : Creation ==================================
        await User.findByIdAndUpdate({_id : body._id}, {
            ...body,
            password
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