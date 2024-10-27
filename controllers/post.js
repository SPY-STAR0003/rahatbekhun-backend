const shortid = require("shortid")
const Post = require("../models/post")
const RootPath = require("app-root-path")
const sharp = require("sharp")
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.addPost = async (req, res, next) => {

    const token = req?.body?.headers?.authorization ?? req?.get('cookie')?.split('rahatbekhun-user-token=')[1]
    const {title} = req.body

    try {

        if(!token) {
            const err = new Error('شما اجازه دسترسی به این قسمت را ندارید، لطفا وارد حساب کاربری خود شوید یا یک حساب کاربری بسازید !')
            err.status = 401
            throw err
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedToken?.userId)
        
        await Post.postValidation(req.body)

        const post = await Post.findOne({title})

        if(post) {
            const err = new Error("پستی با این نام از قبل ثبت شده است !")
            err.statusCode = 400
            throw err
        }

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

    try {

        if(!token) {
            const err = new Error('شما ابتدا باید وارد سایت شوید !')
            err.status = 401
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

        res.status(200).json({
            message : 'عکس با موفقیت آپلود شد !',
            link : `http://rahatbekhun.ir/uploads/posts/covers/${name}`
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}