const Post = require("../models/post")



exports.addPost = async (req, res, next) => {

    const {title} = req.body

    try {
        
        await Post.postValidation(req.body)

        const post = await Post.findOne({title})

        if(post) {
            const err = new Error("پستی با این نام از قبل ثبت شده است !")
            err.statusCode = 400
            throw err
        }

        await Post.create({... req.body})

        res.status(201).json({message : "پست جدید اضافه شد !"})
    } catch (err) {
        next(err)
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