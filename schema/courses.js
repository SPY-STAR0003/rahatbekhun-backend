
const yup = require('yup');

const courseSchema = {
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    episodes : {
        type : String,
        required : true,
    },
    hashtags : {
        type : String,
        required : true,
    },
    cover : {
        type : String,
        required : true,
    },
    userType : {
        type : String,
        required : true,
        trim : true
    },
    subject : {
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
    offers : {
        type : String,
    },
    courseType : {
        type : String,
        required : true,
        trim : true
    },
}

const courseYupSchema = yup.object().shape({
    name : yup.string().required('عامو نمیخای اسم دوره اتو بگی به ما ؟').max(30, 'دادا اسم دوره ات از 30 تا بیشتر نشد لطفا !'),
    description : yup.string().required("اخه لامصببب یه توضیحی بده حداقل !"),
    episodes : yup.string().required("ببین گیر کی افتادیم حضرت عباسی ! دوره میزاری بدون محتوا ؟؟؟؟؟؟"),
    hashtags : yup.string().required("هشتگ نداشته باشد چیجور تو اینترنت دیده بشی هان ؟"),
    cover : yup.string().required("یعنی یک دوره عکس نیمیخاد ؟"),
    userType : yup.string().required("عزیززززمننن! باید معلوم باشه این دوره به درد کی میخوره یا ن ؟").oneOf([
        'دانش آموزان',
        'آموزگاران / دانشجومعلمان',
        'والدین / آموزگاران(تربیتی)',
        'عمومی',
    ], 'ببین باید یکی از این گزینه ها که ما میگوییمو انتخاب کنی !'),
    subject : yup.string().required('دسته بندی گروهی که این دوره را قراره ببینن معلوم نکردی !'),
    subset : yup.string().required('یه دسته بندی داریم که ریز مشخص میکنه اونم مشخص کن خداوکیلی !'),
    price : yup.string().required('قیمت دوره رو بنویس برا من سیس حاتم طایی نگیر !'),
    offers : yup.string(),
    courseType : yup.string().required("نوعی دوره خیلیییی مهمس بخدا حرفی پولساااا !").oneOf([
        "نقدی" ,
        "ویژه اعضا" ,
        "رایگان"
    ], 'نوع دوره رو تو انتخاب میکنی ولی از اونیکه ما میگیم هاهاهاها !')
})

module.exports = {
    courseSchema,
    courseYupSchema
}