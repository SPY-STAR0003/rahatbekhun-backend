
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

exports.addUser = async (req, res, next) => {
    
    const {name, email, password, repeat} = req.body

    try {
        
        await User.userValidation(req.body);

        const hash = await bcrypt.hash(password, 10);

        const user = await User.findOne({email})

        if(user) {
            const err = new Error("این ایمیل قبلاً ثبت شده است !")
            err.statusCode = 400
            throw err
        }

        await User.create({
            ...req.body,
            password : hash,
        })

        // mailSender(email, name, "شما با موفقیت داخل سایت ثبت نام کردید !", `Dear ${name} welcome to our home !`)
        res.status(201).json({massage : "ثبت نام با موفقیت انجام شد !"})
    
    } catch (err) {
        next(err)
    }
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

            const token = jwt.sign({
                userId : user._id.toString(),
                username : user.username
            }, process.env.JWT_SECRET, {expiresIn : "1h"})

            res.status(200).json({token, userId : user._id.toString()})

        } else {
            const err = new Error("رمز عبور شما صحیح نمی باشد !")
            err.statusCode = 422;
            throw err;
        }
        
    } catch (err) {
        next(err)
    }
}