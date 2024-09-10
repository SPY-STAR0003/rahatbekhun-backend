
const mongoose = require('mongoose');
const { courseYupSchema, courseSchema } = require('../schema/courses');

const courseSchemaMongoose = new mongoose.Schema(courseSchema)

courseSchemaMongoose.statics.courseValidation = function(body) {
    return courseYupSchema.validate(body, {
        abortEarly : false,
    })
}

module.exports = mongoose.model("course", courseSchemaMongoose)