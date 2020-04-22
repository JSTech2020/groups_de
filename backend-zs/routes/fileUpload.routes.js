const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'public/images');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    }
);

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can only upload image files'), false);
    }
    cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.post('/upload', upload.single('imageFile'), //will handle errrors for incorrect files
    (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })

module.exports = uploadRouter;