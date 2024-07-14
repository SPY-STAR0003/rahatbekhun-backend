const Worksheet = require("../models/worksheet");


exports.advancedSearch = async (req, res, next) => {

    let {_type, price, page, per_page, ...props} = req.query

    const perPage = Number(per_page) || 6
    const pageNum = Number(page) || 1
    
    try {

        if(price === 'فقط رایگان')
            props = {...props, price : '0'}

        let data;
        let documents;
        
        if(_type === 'کاربرگ') {
            documents = await Worksheet.find(props).countDocuments()
            data = await Worksheet.find(props).skip((pageNum-1)*perPage).limit(perPage)
        }
        
        const totalPages = Math.ceil(documents/perPage)

        res.status(200).json({
            message : 'اطلاعات با موفقیت دریافت شد !',
            data,
            totalPages,
            documents
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}