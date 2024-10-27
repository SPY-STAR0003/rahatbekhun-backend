
const yup = require('yup');

const postSchema = {
    name : {
        type : String,
        required : true,
        trim : true
    },
    category : {
        type : String,
        required : true,
        trim : true
    },
    condition : {
        type : String,
        required : true,
        trim : true
    },
    user : {
        type : String,
        required : true,
        trim : true
    },
    cover : {
        type : String,
        required : true,
        trim : true
    },
    hashtags : {
        type : String,
        required : true,
        trim : true
    },
    author : {
        type : String,
        trim : true
    },
    body : {
        type : String,
        required : true
    },
    createdAt : {
        required : true,
        type : String
    }
}

const postYupSchema = yup.object().shape({
    name : yup.string().required('برای پست جدیدت یه اسم بزار باو !'),
    category : yup.string().required('یه دسته بندی برای پستت مشخص کن !'),
    user : yup.string().required('این پست بیشتر به درد کی میخوره ؟'),
    cover : yup.string().required('برای پستت یه کاور بزار خوشتیپ !'),
    condition : yup.string().required('وضعیت پستت رو مشخص کن !'),
    body : yup.string().required('برای پستت یه متن بنویس !'),
    hashtags : yup.string().required('هشتگ برای پستت از نون شب واجب تره !'),
    author : yup.string(),
})

module.exports = {
    postSchema,
    postYupSchema
}