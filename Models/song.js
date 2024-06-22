const mongoose =require("mongoose");

const Songs = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    thumbnail:{
        type : String,
        required : true,
    },
    track:{
        type : String,
        required : true,
    },
    artists:{
        type : mongoose.Types.ObjectId,
        ref  : "User",
    },
});

const SongsModel = mongoose.model("Songs", Songs);
module.exports = SongsModel;