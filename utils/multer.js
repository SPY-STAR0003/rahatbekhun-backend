

const multer = require("multer");
const shortId = require('shortid');


exports.storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/videos");
    },
    filename: (req, file, cb) => {
        cb(null, `${shortId.generate()}_${file.originalname}`);
    },
});

exports.fileFilter = (req, file, cb) => {
    if (file.mimetype == "video/mp4") {
        cb(null, true);
    } else {
        cb("فقط پسوند MP4 قابل قبول است !", false);
    }
};