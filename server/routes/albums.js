const router = require("express").Router();

//our albums model
const album = require("../models/albums");



// Created album save request
router.post("/save", async (req, res) => {
    // Object which collects form data from the api request
    const newAlbum = album({
        name: req.body.name,
        imageURL: req.body.imageURL,
        albumDate: req.body.albumDate,
        albumLanguage: req.body.albumLanguage,
    });

    // Saving Album Information in MongoDb
    try {
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({success: true, album: savedAlbum });
    } catch (error) {
        return res.status(400).send({success: false, msg: error });
    }
});

// Created a single album get request
// We are using id which MongoDb uniquely provides as reference
router.get("/getOne/:id", async (req, res) => {
    const filter = {_id : req.params.id};

    const data = await album.findOne(filter)

    if (data) {
        return res.status(200).send({success: true, album: data });
    }else {
        return res.status(400).send({success: false, msg: "Data not available" });
    }
});

// Created All albums get request
router.get("/getAll", async (req, res) => {
    const options = {
        sort:{
            createdAt: 1,
        },
    };

    const data = await album.find(options);
    if (data) {
        return res.status(200).send({success: true, album: data });
    }else {
        return res.status(400).send({success: false, msg: "Data not available" });
    }

});

//Created album update request
router.put("/update/:id", async (req, res) => {

    const filter = {_id: req.params.id};

    const options = {
        upsert: true,
        new: true
    };

    try{
        const result = await album.findOneAndUpdate(filter,{
                name: req.body.name,
                imageURL: req.body.imageURL,
                albumDate: req.body.albumDate,
                albumLanguage: req.body.albumLanguage,
            },
            options
        );

        return res.status(200).send({success: true, data: result });
    } catch (error) {
        return res.status(400).send({success: false, msg: error });
    }
});

// Created album delete request
router.delete("/delete/:id", async (req, res) => {
    const filter = {_id : req.params.id};

    const result = await album.deleteOne(filter);

    if (result) {
        return res.status(200).send({success: true, msg: "Data Deleted successfully", data: result });
    }else {
        return res.status(400).send({success: false, msg: "Data not available" });
    }

});

module.exports = router;