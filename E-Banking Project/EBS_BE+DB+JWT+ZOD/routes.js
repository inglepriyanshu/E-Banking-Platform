const express = require('express');
const router = express.Router();
const User = require("./db");
const {userMiddleware} = require("./middleware");
const {validateUserInput} = require("./middleware");
const jwt = require("jsonwebtoken");

require("dotenv").config();


router.post("/signup",validateUserInput, async (req,res)=>
{
    const  name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const ac_no = req.body.ac_no;


    const token = jwt.sign(password, process.env.JWT_KEY);
   const response = await User.findOne({
        name,
        password:token,
        ac_no,
        email
    })

    if(response)
    {
        res.setHeader('Content-Type', 'application/json');
        res.json({
            msg :"User already exists"
        })
    }
    else
    {
        try{
            await User.create({
        name,
        ac_no,
        email,
        password:token
      });
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({msg: "You have signed up successfully!",
                            token: token})
        }
        catch(e){
            res.json({
                msg : "We had trouble creating your account."
            })
        }
    }
    })

router.post("/signin",userMiddleware,async (req,res)=>
{       res.status(200).json({
            msg: "You have signed in successfully"});
})

module.exports = router;