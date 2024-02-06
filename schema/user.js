
const yup = require('yup');

const userSchema = {
    username : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    repeat : {
        type : String,
        required : true
    }
}

const userYupSchema = yup.object().shape({
    username : yup.string().required("نام کاربری الزامی است !").max(20, "نام کاربری نمی تواند بیش از 20 کاراکتر باشد !"),
    email : yup.string().email("شما باید ایمیل وارد کنید !").required("وارد کردن ایمیل الزامی است !"),
    password : yup.string().required("وارد کردن رمز عبور الزامی است !").min(8, "رمز عبور حداقل باید 8 کاراکتر باشد !"),
    repeat : yup.string().required("وارد کردن تکرار رمزعبور الزامی است !").min(8, "تکرار رمزعبور باید حداقل 8 کاراکتر باشد !")
        .oneOf([yup.ref('password'), null], 'رمز عبور باید با تکرار آن یکسان باشد !')
})

module.exports = {
    userSchema,
    userYupSchema
}