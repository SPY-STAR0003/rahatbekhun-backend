
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.addUser = async (req, res) => {
    
    const {name, email, password, repeat} = req.body

    User.userValidation(req.body)
        .then(async() => {
            const hash = await bcrypt.hash(password, 10)

            User.create({
                ...req.body,
                password : hash,
                repeat : hash
            })
            .then(() => {
                // mailSender(email, name, "شما با موفقیت داخل سایت ثبت نام کردید !", `Dear ${name} welcome to our home !`)
                res.status(201).json({massage : "ثبت نام با موفقیت انجام شد !"})
            
            })
            .catch((err) => {
                err.code === 11000
                ?   res.status(402).json({massage : "این ایمیل قبلاً استفاده شده است !"}, err)
                :   res.status(401).json({massage : "ساخت کاربر با یک مشکل غیرقابل پیش بینی مواجه شده است !", err})
            })
        })
        .catch((err) => {
            res.status(401).json({
                massage : "در اعتبار سنجی اطلاعات شما مشکلی به وجود آمده است !",
                err
            })
        })
}

exports.loginCtrl = async (req, res, next) => {

    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        
        if(!user) {
            const err = new Error( "کاربری با این مشخصات یافت نشد !")
            err.statusCode = 422;
            throw err
        }

        const isPassEqual = await bcrypt.compare(password, user.password)

        if(isPassEqual) {
            const token = {
                userId : user._id,
                email : user.email,
                username : user.username
            }

            res.status(200).json(token)
        } else {
            const err = new Error("رمز عبور شما صحیح نمی باشد !")
            err.statusCode = 422;
            throw err;
        }
        
    } catch (err) {
        next(err)
    }
}