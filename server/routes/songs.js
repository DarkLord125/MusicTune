const router = require("express").Router();

//our songs model
const song = require("../models/songs");



// Created song save request
router.post("/save", async (req, res) => {
    // Object which collects form data from the api request
    const newSong = song({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
        lyrics: req.body.lyrics,
    });

    // Saving Song Information in MongoDb
    try {
        const savedSong = await newSong.save();
        return res.status(200).send({success: true, song: savedSong });
    } catch (error) {
        return res.status(400).send({success: false, msg: error });
    }
});

// Created a single song get request
// We are using id which MongoDb uniquely provides as reference
router.get("/getOne/:id", async (req, res) => {
    const filter = {_id : req.params.id};

    const data = await song.findOne(filter)

    if (data) {
        return res.status(200).send({success: true, song: data });
    }else {
        return res.status(400).send({success: false, msg: "Data not available" });
    }
});

// Created All songs get request
router.get("/getAll", async (req, res) => {
    const options = {
        sort:{
            createdAt: 1,
        },
    };

    const data = await song.find(options);
    if (data) {
        return res.status(200).send({success: true, song: data });
    }else {
        return res.status(400).send({success: false, msg: "Data not available" });
    }

});

//Created song update request
router.put("/update/:id", async (req, res) => {

    const filter = {_id: req.params.id};

    const options = {
        upsert: true,
        new: true
    };

    try{
        const result = await song.findOneAndUpdate(filter,{
                name: req.body.name,
                imageURL: req.body.imageURL,
                songURL: req.body.songURL,
                album: req.body.album,
                artist: req.body.artist,
                language: req.body.language,
                lyrics: req.body.lyrics,
            },
            options
        );

        return res.status(200).send({success: true, data: result });
    } catch (error) {
        return res.status(400).send({success: false, msg: error });
    }
});

// Created song delete request
router.delete("/delete/:id", async (req, res) => {
    const filter = {_id : req.params.id};

    const result = await song.deleteOne(filter);

    if (result) {
        return res.status(200).send({success: true, msg: "Data Deleted successfully", data: result });
    }else {
        return res.status(400).send({success: false, msg: "Data not available" });
    }

});


module.exports = router