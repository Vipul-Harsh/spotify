const express = require("express");
const router = express.Router(); //only required function
const User = require("../Models/user");
const bcrypt  = require("bcrypt");
const {getToken} = require("../utlis/helper");






router.post("/register" , async(req , res) => {
    const {email , password , firstName, lastName ,userName} = req.body;
     
    const user = await User.findOne({email: email});
    if(user){
        
        return res
        .status(403)
        .json({error: " A user with this email already exists"})
    }
    //valid request
    //create new user in the db

    const hashedPassword = bcrypt.hash(password, 10);
    const newUserData = {
         email, 
         password: hashedPassword ,
         firstName ,
         lastName ,
         userName,
        };
    const newUser = await User.create(newUserData);


    //token to return user


    const token = await getToken(email, newUser);


    //retur result

    const userToReturn = {...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);



})

module.exports = router