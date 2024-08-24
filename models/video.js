
const mongoose = require('mongoose');
const { videoYupSchema, videoSchema } = require('../schema/videos');

const videoSchemaMongoose = new mongoose.Schema(videoSchema)

videoSchemaMongoose.statics.videoValidation = function(body) {
    return videoYupSchema.validate(body, {
        abortEarly : false,
    })
}

module.exports = mongoose.model("video", videoSchemaMongoose)