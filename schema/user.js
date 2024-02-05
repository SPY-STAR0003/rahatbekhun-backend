
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
    username : yup.string().required().max(20),
    email : yup.string().required().email(),
    password : yup.string().required().min(8),
    repeat : yup.string().required().min(8).oneOf([yup.ref('password'), null], 'Passwords must match')
})


module.exports = {
    userSchema,
    userYupSchema
}