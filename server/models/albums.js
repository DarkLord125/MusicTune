const mongoose = require("mongoose");

const AlbumsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        albumDate: {
            type: String,
            required: true,
        },
        albumLanguage: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("albums", AlbumsSchema);