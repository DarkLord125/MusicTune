// Object used for navigating the user to the proper router
const router = require("express").Router();

const user = require("../models/user")

const admin = require("../config/firebase.config");

router.get("/login", async(req, res) => {
    // if token is not available, send error
    if(!req.headers.authorization){
        return res.status(500).send({message : "Invalid Token"});
    }
    // as token is seperated by 1 space
    const token = req.headers.authorization.split(" ")[1];
    try{
        // the token is verified by admin using the service account private key in the JSON File
    const decodeValue = await admin.auth().verifyIdToken(token);
        if(!decodeValue){
            return res.status(505).json({message: "UnAuthorized"})
        }else {
            // Checking user exists or not
            const userExists = await user.findOne({"user_id" : decodeValue.user_id})
            if(!userExists){
                newUserData(decodeValue, req, res)
            }else {
                updateNewUserData(decodeValue, req, res)
            }
        }
    }catch(error){
        return res.status(505).json({message: error})
    }
})

// function to Store User Information
const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time
    })
    try {
        const savedUser = await newUser.save();
        res.status(200).send({user : savedUser})
    } catch (error){
        res.status(400).send({success : false, msg: error});
    }
}

// function to Update User Information
const updateNewUserData = async (decodeValue, req, res) => {
    const filter = {user_id : decodeValue.user_id};

    const options = {
        upsert: true,
        new: true
    };
    
    try{
        const result = await user.findOneAndUpdate(
            filter,
            {auth_time: decodeValue.auth_time},
            options
        );
        res.status(200).send({user: result})
    }catch (error) {
        res.status(400).send({success : false, msg: error});
    }
}

router.get("/getUsers", async (req, res) => {
    const options = {
        sort:{
            createdAt: 1,
        },
    };

    const result = await user.find(options);
    if(result){
        res.status(200).send({success: true, data: result});
    }else{
        res.status(400).send({success: false, msg: "No Data Found"});
    }
})


module.exports = router;