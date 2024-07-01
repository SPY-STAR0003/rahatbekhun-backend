
const yup = require('yup');

const worksheetSchema = {
    _type : {
        type : String,
        required : true,
        trim : true
    },
    _subject : {
        type : String,
        required : true,
        trim : true
    },
    _author : {
        type : String,
        required : true,
        trim : true
    },
    _grade : {
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
    season : {
        type : String,
        required : true,
        trim : true
    },
    info :{
        type : String,
        required : true,
        trim : true
    },
    author : {
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
    price : {
        type : String,
        required : true,
        trim : true
    },
    pages : {
        type : String,
        required : true,
        trim : true
    },
    key : {
        type : String,
        required : true,
        trim : true
    },
    rotation : {
        type : String,
        required : true,
        trim : true
    },
    usableFor : {
        type : String,
        required : true,
        trim : true
    },
    isPublished : {
        type : Boolean,
        required : true,
        trim : true
    },
    hashtags : {
        type : Array,
        required : true,
        trim : true
    },
    images : {
        type : String,
        required : true
    },
    pdf : {
        type : String,
        required : true
    },
}

const worksheetYupSchema = yup.object().shape({
    _type : yup.string().required('آخه این فایل چه مدلی هست ؟').oneOf(["کاربرگ","ویدیو","دوره","آزمون","بازی"]),
    _subject : yup.string().required('فدات شم این از کدوم کتابه ؟ چرا نمیگی ؟').oneOf(["ریاضی","فارسی","مطالعات","قرآن و هدیه ها","هنر","علوم","تفکروپژوهش","کاروفناوری"], 'از بین کتابا یه کتاب انتخاب کن !'),
    _author : yup.string().required("سازنده این کاربرگ سطحش چیه ؟").oneOf(["راحت بخون","سازندگان تاییدشده","سازندگان معمولی"]),
    _grade : yup.string().required('طرف نباس بدونه مالی چه سالیه این کاربرگ ؟').oneOf(['اول','دوم','سوم','چهارم','پنجم','ششم'], 'مال چه پایه ایه ؟ پایه رو انتخاب نکردی که !!'),
    _rating : yup.number().required("چرا کاربرگ امتیازی نداره ؟؟؟"),
    name : yup.string().required('یعنی کاربرگتو یه اسم براش نمیزاری ؟'),
    season : yup.string().required('فصلو یادت رفت اوسا !'),
    info : yup.string().required("دو کلوم نوشتن برا این لامصب اینقد سخته که نمی نویسی ؟؟").max(150, 'حالا گفتیم بنویس ولی ن دیگه بیش از ۱۵۰ تا حرف!'),
    author : yup.string().required("نباس نویسنده این کاربرگ مشخص باشه ؟؟؟"),
    type : yup.string().required("نوعشو بگو معلما میدونن واس چه کاری میخان کاربرگتو !").oneOf(['تمرینی','مهارت محور','آماده سازی','بسطی-امتدادی','خلاقیتی','آزمون'], 'نباس نوع کاربرگتو معلوم کنی آیا ؟؟؟'),
    level : yup.string().required("سختیشو بگو طرف بتونه حل کنه حداقل !").oneOf(['آسان','متوسط','تسلا'], "سختی کاربرگتو یادت رفته حاجی !"),
    price : yup.number().required("برای کاربرگت قیمت بزار !"),
    pages : yup.string().required('صفحه های مرتبطت رو بگو راحت تر بقیه کاربرگ تو پیدا کنند !').max(10, 'حداکثر تعداد کاراکتر ۱۰ تاست ! فقط بگو از کجا تا کجا ! همین !'),
    key : yup.string().required("باید مشخص بشه این کاربرگ پاسخنامه داره یا نه !").oneOf(['دارد', 'ندارد']),
    rotation : yup.string().required("جهت کاربرگ رو مشخص نمی کنی ؟").oneOf(['عمودی','افقی']),
    usableFor : yup.string().required("باید بگی این کاربرگ برای چیه !؟").oneOf(["برای تمرین و آزمون","مخصوص آزمون" ,"مخصوص تمرین" ], "گزینه ای که میگی داخل گزینه ها نیست !"),
    isPublished : yup.boolean().required("دست شوما درد نکنه !"),
    hashtags : yup.array().required('اصن هشتگ نزاری بعداً چجور ملت اینا پیدا کنند ؟').of(yup.string()),
    images : yup.string().required('عکس کاربرگ رو یادت رفته آپلود کنی !'),
    pdf : yup.string().required('عکس کاربرگ رو یادت رفته آپلود کنی !')
})

module.exports = {
    worksheetSchema,
    worksheetYupSchema
}