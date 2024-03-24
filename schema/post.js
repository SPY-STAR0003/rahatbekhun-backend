
const yup = require('yup');

const postSchema = {
    title : {
        type : String,
        required : true,
        trim : true
    },
    category : {
        type : String,
        required : true,
        trim : true
    },
    type : {
        type : String,
        required : true,
        trim : true
    },
    body : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        required : true
    }
}

const categoryOneOf = [
    'ریاضی',
    'ورزش و سلامتی',
    'آموزش زبان',
    'هنر',
    'تاریخ و جغرافیا',
    'تکنولوژی',
    'روابط اجتماعی',
    'علوم و آزمایشگاه',
    'دینی و مذهبی',
    'بازی',
    'روانشناسی کودک',
    'متفرقه',
]

const postYupSchema = yup.object().shape({
    title : yup.string().required("نام پست الزامی است !").max(30, "نام پست باید حداکثر 30 کاراکتر باشد !"),
    category : yup.string().oneOf(categoryOneOf, "از بین دسته بندی های قرار گرفته یکی را انتخاب کنید !").required("دسته بندی مناسبی را انتخاب کنید !"),
    type : yup.string().oneOf(['عمومی', 'خصوصی', 'منتظر انتشار'], "لطفا نوع فایل را از موارد گفته شده انتخاب کنید !").required("نوع فایل خود را انتخاب کنید !"),
    body : yup.string().required("متنی برای پست خود بنویسید !"),
    createdAt : yup.date("فقط مقدار زمان قابل قبول است !").required("زمان را وارد کنید !")
})

module.exports = {
    postSchema,
    postYupSchema
}