
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const {verify} = require('hcaptcha');

exports.addUser = async (req, res, next) => {
    
    const {name, email, password, repeat} = req.body

    try {
        
        await User.userValidation(req.body);

        if(password !== repeat) {
            const err = new Error("پسورد و تکرار آن یکسان نمی باشد !")
            err.status = 400
            throw err
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.findOne({email})

        if(user) {
            const err = new Error("این ایمیل قبلاً ثبت شده است !")
            err.status = 400
            throw err
        }

        await User.create({
            ...req.body,
            password : hash,
        })

        // mailSender(email, name, "شما با موفقیت داخل سایت ثبت نام کردید !", `Dear ${name} welcome to our home !`)
        res.status(201).json({massage : "ثبت نام با موفقیت انجام شد !"})
    
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.loginCtrl = async (req, res, next) => {

    const {email, password, captchaToken} = req.body

    try {

        const captcha = await verify(process.env.HCAPTCHA_SECRET_KEY, captchaToken)
            .then((data) => {
                if (data.success === true) {
                    console.log(data)
                    return true
                } else {
                    console.log(data)
                }
            })
            .catch((err) => console.log(err));

        if(captcha !== true) {
            const err = new Error("مشکل captcha ")
            err.data = "ثابت کنید که انسان هستید !"
            err.status = 401;
            throw err
        } 

        const user = await User.findOne({email})
        
        if(!user) {
            const err = new Error("عدم تطابق مشخصات")
            err.data = "کاربری با این ایمیل وجود ندارد"
            err.status = 401;
            throw err;
        }

        const isPassEqual = await bcrypt.compare(password, user.password)

        if(isPassEqual) {

            const token = jwt.sign({
                userId : user._id.toString(),
                username : user.username
            }, process.env.JWT_SECRET)

            res.status(200).json({token, userId : user._id.toString()})

        } else {
            const err = new Error("رمز عبور نامعتبر")
            err.data = "رمزعبور صحیح نمی باشد !"
            err.status = 401;
            throw err;
        }
        
    } catch (err) {
        next(err)
    }
}

exports.auth = async (req, res, next) => {

    const token = req?.body?.headers?.authorization ?? req?.get('cookie')?.split('rahatbekhun-user-token=')[1]

    try {

        if(!token) {
            const err = new Error('شما اجازه دسترسی به این قسمت را ندارید، لطفا وارد حساب کاربری خود شوید یا یک حساب کاربری بسازید !')
            err.status = 401
            throw err
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedToken) {
            const err = new Error('شما اجازه دسترسی به این قسمت را ندارید، لطفا وارد حساب کاربری خود شوید یا یک حساب کاربری بسازید !')
            err.status = 401
            throw err
        }

        // ====== this line will help to avoid that guests access admin panel !
        if(req.body.checker) {
            res.status(200).json(decodedToken)
        }

        req.userId = decodedToken
        next();

    } catch (err) {
        next(err)
    }
}