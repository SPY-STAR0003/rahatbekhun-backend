const sharp = require("sharp");
const shortId = require('shortid');
const root = require('app-root-path');
const worksheet = require("../models/worksheet");


exports.addWorksheet = async (req, res) => {

    const {files, body} = req
    
    // TODO : Get Hashtags ==================================    
    const newBody = Object.keys(body)
        .filter(item => item !== 'hashtags[]')
        .reduce((newObj, key) =>
        {
            newObj[key] = body[key];
            return newObj;
        }, {hashtags : body['hashtags[]']})

    // TODO : Get Images ====================================
    const uploadedImages = Object.values(files)[0].length
        ? Object.values(files)[0]
        : [Object.values(files)[0]]

    try {

        // TODO : Validation ================================
        await worksheet.worksheetValidation({...newBody})

        // TODO : Make Images Ready ! =======================
        const picturesFolder = []

        uploadedImages.forEach(async (picture, index) => {          
            const name = `${shortId.generate()}_${picture.name}`
            const path = `${root}/public/uploads/worksheets/${name}`
            picturesFolder.push({file : index, name})

            await sharp(picture.data)
            .jpeg({quality : 60})
            .toFile(path)
            .catch((err) => {
                console.log(err)
            })
        });
        // TODO : Creation ==================================
        worksheet.create({
            ...newBody,
            picturesFolder
        })

        res.status(200).json({
            message : "done"
        })

    } catch (err) {

        console.log(err)

        res.status(400).json({
            message : "problems everywhere !",
            err
        })
    }

}