
const yup = require('yup');

const userSchema = {
    username : {
        type : String,
        required : true,
        trim : true,
        max : 30
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
    },
    avatar : {
        type : String,
    },
    level : {
        type : String,
        required : true,
        trim : true,
    },
    nickname : {
        type : String
    },
    lastSign : {
        type : String
    },
    completedCourses : {
        type : String
    },
    currentCourses : {
        type : String
    },
    score : {
        type : String
    },
    description : {
        type : String
    },
    expertise : {
        type : String
    },
    degree : {
        type : String
    },
}

const userYupSchema = yup.object().shape({
    username : yup.string().required("نام کاربری الزامی است !").max(30, "نام کاربری نمی تواند بیش از 30 کاراکتر باشد !"),
    email : yup.string().email("شما باید ایمیل وارد کنید !").required("وارد کردن ایمیل الزامی است !"),
    password : yup.string().required("وارد کردن رمز عبور الزامی است !").min(8, "رمز عبور حداقل باید 8 کاراکتر باشد !"),
    repeat : yup.string().min(8, "تکرار رمزعبور باید حداقل 8 کاراکتر باشد !")
        .oneOf([yup.ref('password'), null], 'رمز عبور باید با تکرار آن یکسان باشد !'),
    avatar : yup.string(),
    level : yup.string().required().oneOf(['مدیر', 'کاربر', 'آموزگار']),
    nickname : yup.string(),
    lastSign : yup.string(),
    completedCourses : yup.string(),
    currentCourses : yup.string(),
    score : yup.string(),
    description : yup.string(),
    expertise : yup.string(),
    degree : yup.string(),
})

module.exports = {
    userSchema,
    userYupSchema
}