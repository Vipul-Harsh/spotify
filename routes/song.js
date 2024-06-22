const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../Models/song");

router.post("/create" , passport.authenticate("jwt" , {session: false}), async(req,res) => {
       
    const { name , thumbnail , track} = req.body;
    if(!name || !thumbnail || !track){
        return res
            .status(301)
            .json({err: "insufficient details to create song"});
    }
    const artist = req.user._id;
    const songDetails = {name, thumbnail , track , artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
});


//get route 

router.get("/get/mysongs" ,passport.authenticate("jwt", {session: false}),
async(req, res) => {
    const currentUser = req.user;

    const songs = await Song.find({artist: currentUser._id});
    return res.status(200).json({data: songs});
}
);

module.exports = router;