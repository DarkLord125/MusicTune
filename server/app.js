const express = require("express");
const app = express();
// This package is required to take our env file
require("dotenv/config")

const cors = require("cors");
const {default: mongoose} = require("mongoose");

// Making our api routes accessible
app.use(cors({origin: true}));

//Middleware to read and write incoming and outgoing json data
app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Hey there...")
})

// User Authentication Route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artists Routes
const artistsRoutes = require("./routes/artists");
app.use("/api/artists/", artistsRoutes);

// Albums Routes
const albumsRoutes = require("./routes/albums");
app.use("/api/albums/", albumsRoutes);

// Songs Routes
const songsRoutes = require("./routes/songs");
app.use("/api/songs/", songsRoutes);

// Connection with MongoDb
mongoose.connect(process.env.DB_STRING, {useNewUrlParser : true});
mongoose.connection
    .once("open", () => console.log("Connected"))
    .on("error", (error) => {
        console.log(`Error : ${error}`);
    })

app.listen(4000,() => console.log("Listening to port 4000"));
