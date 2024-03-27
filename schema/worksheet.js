
const yup = require('yup');

const worksheetSchema = {
    name : {
        type : String,
        required : true,
        trim : true
    },
    grade : {
        type : String,
        required : true,
        trim : true
    },
    book : {
        type : String,
        required : true,
        trim : true
    },
    season : {
        type : String,
        required : true,
        trim : true
    },
    pages : {
        type : String,
        required : true,
        trim : true
    },
    type : {
        type : String,
        required : true,
        trim : true
    },
    level : {
        type : String,
        required : true,
        trim : true
    },
    status : {
        type : String,
        required : true,
        trim : true
    },
    details : {
        type : String,
        required : true,
        trim : true
    },
    hashtags : {
        type : Array,
        required : true,
        trim : true
    },
}

const worksheetYupSchema = yup.object().shape({
    name : yup.string().required('یعنی کاربرگتو یه اسم براش نمیزاری ؟'),
    grade : yup.string().required('طرف نباس بدونه مالی چه سالیه این کاربرگ ؟').oneOf(['اول','دوم','سوم','چهارم','پنجم','ششم'], 'مال چه پایه ایه ؟ پایه رو انتخاب نکردی که !!'),
    book : yup.string().required('فدات شم این از کدوم کتابه ؟ چرا نمیگی ؟').oneOf(["ریاضی","فارسی","مطالعات","قرآن و هدیه ها","هنر","علوم","تفکروپژوهش","کاروفناوری"], 'از بین کتابا یه کتاب انتخاب کن !'),
    season : yup.string().required('فصلو یادت رفت اوسا !'),
    pages : yup.string().required('صفحه های مرتبطت رو بگو راحت تر بقیه کاربرگ تو پیدا کنند !').max(10, 'حداکثر تعداد کاراکتر ۱۰ تا می باشد ! فقط صفحات را مشخص کنید !'),
    type : yup.string().required("نوعشو بگو معلما میدونن واس چه کاری میخان کاربرگتو !").oneOf(['تمرینی','مهارت محور','آماده سازی','بسطی-امتدادی','خلاقیتی','آزمون'], 'نباس نوع کاربرگتو معلوم کنی آیا ؟؟؟'),
    level : yup.string().required("سختیشو بگو طرف بتونه حل کنه حداقل !").oneOf(['ساده','متوسط','تسلا'], "سختی کاربرگتو یادت رفته حاجی !"),
    status : yup.string().required("دست شوما درد نکنه !").oneOf(['منتشرشده','در دست بررسی'], ""),
    details : yup.string().required("دو کلوم نوشتن برا این لامصب اینقد سخته که نمی نویسی ؟؟"),
    hashtags : yup.array().required('اصن هشتگ نزاری بعداً چجور ملت اینا پیدا کنند ؟').of(yup.string()),
})

module.exports = {
    worksheetSchema,
    worksheetYupSchema
}