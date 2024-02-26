const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://inglepriyanshu69:clashnboom@cluster0.odpaelt.mongodb.net/ebs_be_auth");

const UserSchema = new mongoose.Schema({
    name : String,
    ac_no: String,
    email:String,
    password:String
})

const User = mongoose.model("User",UserSchema);

module.exports= User;