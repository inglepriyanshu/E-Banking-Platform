const mongoose = require("mongoose");

mongoose.connect("/ebs_be_auth");

const UserSchema = new mongoose.Schema({
    name : String,
    ac_no: String,
    email:String,
    password:String
})

const User = mongoose.model("User",UserSchema);

module.exports= User;