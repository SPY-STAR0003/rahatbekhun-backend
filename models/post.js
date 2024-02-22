
const mongoose = require('mongoose');
const { postSchema, postYupSchema } = require('../schema/post');

const postSchemaMongoose = new mongoose.Schema(postSchema)

postSchemaMongoose.statics.postValidation = function(body) {
    return postYupSchema.validate(body, {
        abortEarly : false,
    })
}

module.exports = mongoose.model("post", postSchemaMongoose)