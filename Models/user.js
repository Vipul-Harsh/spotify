const mongoose =require("mongoose");

const user = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
    },
    lastName:{
        type : String,
        required : false,
    },
    email: {
        type : String,
        required : true,
    },
    userName:{
        type : String,
        required : true,
    },
    likesSongs:{
        type : String,
        default: "",
    },
    likesPlayLists:{
        type : String,
        default:"",
    },
    SubscribedArtist:{
        type : String,
        default: "",
    }
});

const UserModel = mongoose.model("User", user);
module.exports = UserModel;