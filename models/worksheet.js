
const mongoose = require('mongoose');
const { worksheetYupSchema, worksheetSchema } = require('../schema/worksheet');

const worksheetSchemaMongoose = new mongoose.Schema(worksheetSchema)

worksheetSchemaMongoose.statics.worksheetValidation = function(body) {
    return worksheetYupSchema.validate(body, {
        abortEarly : false,
    })
}

module.exports = mongoose.model("worksheet", worksheetSchemaMongoose)