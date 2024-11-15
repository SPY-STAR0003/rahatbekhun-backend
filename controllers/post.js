const shortid = require("shortid")
const Post = require("../models/post")
const RootPath = require("app-root-path")
const sharp = require("sharp")
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fs = require('fs');

exports.addPost = async (req, res, next) => {

    const token = req?.body?.headers?.authorization ?? req?.get('cookie')?.split('rahatbekhun-user-token=')[1]

    try {

        if(!token) {
            const err = new Error('شما اجازه دسترسی به این قسمت را ندارید، لطفا وارد حساب کاربری خود شوید یا یک حساب کاربری بسازید !')
            err.status = 401
            throw err
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedToken?.userId)
        
        await Post.postValidation(req.body)

        await Post.create({... req.body, author : user?.username})

        res.status(201).json({message : "پست جدید اضافه شد !"})
    } catch (err) {
        next(err)
        console.log(err)
    }

}

exports.getPosts = async (req, res, next) => {
    try {

        const posts = await Post.find()

        if(!posts) {
            const err = new Error("مشکلی در گرفتن اطلاعات به وجود آورده است !")
            err.statusCode = 400
            throw err;
        }

        res.status(200).json({posts})

    } catch (err) {
        next(err)
        console.log(err)
    }
}

exports.deletePost = async (req, res, next) => {

    try {
        const id = req?.query?.id

        if(!id) {
            const err = new Error("شما درخواست درستی ارسال نکرده اید !")
            err.statusCode = 404;
            throw err;
        }

        const post = await Post.findById(id)
        
        fs.unlink(`public/${post.cover.split('http://rahatbekhun.ir/')[1]}`, err => err && console.log(err))

        await Post.findByIdAndDelete(id)
    
        res.status(200).json({message : "پست با موفقیت حذف شد !"})
    
    } catch (err) {
        err.message.includes('Cast to ObjectId failed for value')
        ? res.status(400).json({message : "مشکلی در درخواست شما وجود دارد !"})
        : next(err)
    }
}

exports.uploadCover = async (req, res, next) => {

    const token = req?.body?.headers?.authorization ?? req?.get('cookie')?.split('rahatbekhun-user-token=')[1]
    const image = req.files.image
    const title = req.body.title
    const id = req.body.id

    try {

        if(!token) {
            const err = new Error('شما ابتدا باید وارد سایت شوید !')
            err.status = 401
            throw err
        }

        const post = await Post.findOne({name : title})

        if(id) {
            // if id defined ==> we're editing post
            // then we should check new title doesn't used before
            // but if equals with the post we're editing now ...
            // ... there is no problem !
            if(post && post._id.toHexString() !== id) {
                const err = new Error("پستی با این نام از قبل ثبت شده است !")
                err.statusCode = 400
                throw err
            }
        } else if(!id && post) {
            // if id is undefined & post id defined ...
            // that mean is we're creating a new post with duplicated name !
            const err = new Error("پستی با این نام از قبل ثبت شده است !")
            err.statusCode = 400
            throw err
        }

        const name = `cover_name=${shortid.generate()}_${image.name}`
        const path = `${RootPath}/public/uploads/posts/covers/${name}`

        await sharp(image.data)
            .jpeg({quality : 60})
            .toFile(path)
            .catch((err) => {
                console.log(err)
            })
        
        fs.unlink(post.cover.replace('http://localhost:5000/', 'public/'), err => err && console.log(err))

        res.status(200).json({
            message : 'عکس با موفقیت آپلود شد !',
            link : `http://localhost:5000/uploads/posts/covers/${name}`
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.editPost = async (req, res, next) => {

    try {
        const { id } = req.query

        if(!id) {
            const err = new Error('شناسه معتبری یافت نشد !')
            err.status = 404;
            throw err
        }

        const editedPost = await Post.findById(id).catch(error => {
            const err = new Error('پستی با این مشخصات یافت نشد !')
            err.status = 404;
            err.data = error
            throw err
        })

        res.status(200).json({
            message : 'اطلاعات پست انتخابی با موفقیت دریافت شد !',
            data : editedPost
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.setEditedPost = async (req, res, next) => {


    const {body} = req

    try {

        // TODO : Validation ================================
        await Post.postValidation(body)

        // TODO : Creation ==================================

        await Post.findByIdAndUpdate({_id : body._id}, body)

        res.status(200).json({
            message : "پست با موفقیت ویرایش شد !"
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