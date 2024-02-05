
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
                res.status(201).json({message : "ثبت نام با موفقیت انجام شد !"})
            
            })
            .catch((err) => {
                err.code === 11000
                ?   res.status(402).json({message : "این ایمیل قبلاً استفاده شده است !"}, err)
                :   res.status(401).json({message : "ساخت کاربر با یک مشکل غیرقابل پیش بینی مواجه شده است !", err})
            })
        })
        .catch((err) => {
            res.status(401).json({
                message : "در اعتبار سنجی اطلاعات شما مشکلی به وجود آمده است !",
                err
            })
        })

}