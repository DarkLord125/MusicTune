const mongoose = require("mongoose");

const ArtistsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        instagram: {
            type: String,
            required: true,
        },
        artistDetail: {
            type: String,
            required: true,
        },
        artistCountry: {
            type: String,
            required: true,
        },
        artistGenre: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("artists", ArtistsSchema);