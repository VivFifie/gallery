const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let upload = require('./upload');
const url = require('url');
let Image = require('../models/images');

var db = [];

// GET /
router.get('/', async (req, res) => {
    try {
        const images = await Image.find({});
        res.render('index', { images: images, msg: req.query.msg });
    } catch (err) {
        console.error(err);
        res.render('index', { images: [], msg: 'Error fetching images' });
    }
});

// POST /upload
router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.redirect(`/?msg=${err}`);
        } else {
            console.log(req.file);
            if (req.file == undefined) {
                res.redirect('/?msg=Error: No file selected!');
            } else {
                // create new image
                let newImage = new Image({
                    name: req.file.filename,
                    size: req.file.size,
                    path: 'images/' + req.file.filename
                });

                try {
                    await newImage.save();
                    res.redirect('/?msg=File uploaded successfully');
                } catch (saveErr) {
                    console.error(saveErr);
                    res.redirect('/?msg=Error saving file to database');
                }
            }
        }
    });
});

module.exports = router;
