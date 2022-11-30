const router = require("express").Router();

//our artists model
const artist = require("../models/artists");

// Created artist save request
router.post("/save", async (req, res) => {
    // Object which collects form data from the api request
    const newArtist = artist({
        name: req.body.name,
        imageURL: req.body.imageURL,
        instagram: req.body.instagram,
        artistDetail: req.body.artistDetail,
        artistCountry: req.body.artistCountry,
        artistGenre: req.body.artistGenre,
    });

    // Saving Artist Information in MongoDb
    try {
        const savedArtist = await newArtist.save();
        return res.status(200).send({success: true, artist: savedArtist });
    } catch (error) {
        return res.status(400).send({success: false, msg: error });
    }
});

// Created a single artist get request
// We are using id which MongoDb uniquely provides as reference
router.get("/getOne/:id", async (req, res) => {
    const filter = {_id : req.params.id};

    const data = await artist.findOne(filter)

   if (data) {
       return res.status(200).send({success: true, artist: data });
   }else {
       return res.status(400).send({success: false, msg: "Data not available" });
   }
});

// Created All artists get request
router.get("/getAll", async (req, res) => {
    const options = {
        sort:{
            createdAt: 1,
        },
    };

    const data = await artist.find(options);
    if (data) {
        return res.status(200).send({success: true, artist: data });
    }else {
        return res.status(400).send({success: false, msg: "Data not available" });
    }

});

//Created artists update request
router.put("/update/:id", async (req, res) => {

    const filter = {_id: req.params.id};

    const options = {
        upsert: true,
        new: true
    };

    try{
        const result = await artist.findOneAndUpdate(filter,{
                name: req.body.name,
                imageURL: req.body.imageURL,
                instagram: req.body.instagram,
                artistDetail: req.body.artistDetail,
                artistCountry: req.body.artistCountry,
                artistGenre: req.body.artistGenre,
        },
        options
     );

        return res.status(200).send({success: true, data: result });
    } catch (error) {
        return res.status(400).send({success: false, msg: error });
    }
});

// Created artist delete request
router.delete("/delete/:id", async (req, res) => {
    const filter = {_id : req.params.id};

    const result = await artist.deleteOne(filter);

    if (result) {
        return res.status(200).send({success: true, msg: "Data Deleted successfully", data: result });
    }else {
        return res.status(400).send({success: false, msg: "Data not available" });
    }

});






module.exports = router;