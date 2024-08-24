
const yup = require('yup');

const videoSchema = {
    subject : {
        type : String,
        required : true,
        trim : true
    },
    grade : {
        type : String,
        required : false,
        trim : true
    },
    details : {
        type : String,
        required : true,
        trim : true
    },
    _rating : {
        type : String,
        required : true,
        trim : true
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    author : {
        type : String,
        required : true,
        trim : true
    },
    category : {
        type : String,
        required : true,
        trim : true
    },
    subset : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : String,
        required : true,
        trim : true
    },
    status : {
        type : String,
        required : true,
        trim : true
    },
    hashtags : {
        type : String,
        required : true,
        trim : true
    },
    videoSrc : {
        type : String,
        required : true
    },
    videoId : {
        type : String,
        required : false
    },
}

const videoYupSchema = yup.object().shape({
    name : yup.string().required('حجی فیلمت اسم نداره ؟'),
    details : yup.string().required("دو کلوم نوشتن برا این لامصب اینقد سخته که نمی نویسی ؟؟").max(150, 'حالا گفتیم بنویس ولی ن دیگه بیش از ۱۵۰ تا حرف!'),
    subject : yup.string().required('چرا معلوم نمیکنی موضوع رو ؟ ای بابا !'),
    category : yup.string().required('مخاطب ویدیوت رو معلوم کن عزیزمن !'),
    subset : yup.string().required('یه دسته بندی براش بزاری کسی بدش نمیاد !'),
    author : yup.string().required("آخه این فیلما کی ساخته ؟"),
    price : yup.number().required("پول چرک کف دسته ولی شوما حداقل یه صفر بزار واسه ما !"),
    status : yup.string().required("دست شوما درد نکنه !").oneOf(['انتشار','در دست بررسی','عدم انتشار','تایید نشده']),
    videoId : yup.string(),
    videoSrc : yup.string().required('عامو ویدیویت منبع ندارد !'),
    grade : yup.string().oneOf(['اول','دوم','سوم','چهارم','پنجم','ششم','همه'], 'مال چه پایه ایه ؟ پایه رو انتخاب نکردی که !!'),
    _rating : yup.number().required("چرا کاربرگ امتیازی نداره ؟؟؟"),
})

module.exports = {
    videoSchema,
    videoYupSchema
}