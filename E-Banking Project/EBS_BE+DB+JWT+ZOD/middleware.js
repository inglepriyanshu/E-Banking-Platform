const User = require("./db");
const jwt = require("jsonwebtoken")
require("dotenv").config();
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const name = req.headers.name;
    const password = req.headers.password;
    const email = req.headers.email;
    const ac_no= req.headers.ac_no;
    
    const passToken = jwt.sign(password,process.env.JWT_KEY);
    
    const response = await User.findOne({
        name : name,
        password: passToken,
        email : email,
        ac_no:ac_no
    })
if(response)
{
    next();
} 
else{
    res.status(401).json({
        msg: "User does not exist"
    });
} 
}


module.exports = userMiddleware;