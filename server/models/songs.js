const mongoose = require("mongoose");

const SongsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        songURL: {
            type: String,
            required: true,
        },
        album: {
            type: String
        },
        artist: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        lyrics: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("songs", SongsSchema);