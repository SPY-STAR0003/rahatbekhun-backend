
const mongoose = require('mongoose');
const { userYupSchema, userSchema } = require('../schema/user');

const userSchemaMongoose = new mongoose.Schema(userSchema)

userSchemaMongoose.statics.userValidation = function(body) {
    return userYupSchema.validate(body, {
        abortEarly : false,
    })
}

module.exports = mongoose.model("user", userSchemaMongoose)