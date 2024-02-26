const express = require('express');
const router = express.Router();
const User = require("./db");
const userMiddleware = require("./middleware");
const jwt = require("jsonwebtoken");
const zod = require("zod");
require("dotenv").config();

const passwordSchema = zod
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/.*(?=[A-Z])/, 'Password must contain at least one uppercase letter')
  .regex(/.*(?=\d)/, 'Password must contain at least one digit');

router.post("/signup",async (req,res)=>
{
    const  name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const ac_no = req.body.ac_no;


    const validationResult = passwordSchema.safeParse(password);
     if (!validationResult.success) {
        let errorMsg = "Your password is invalid: " ;
        validationResult.error.errors.forEach(errorMessage => {
          errorMsg = errorMsg+ errorMessage.message + ". ";
        });
        return res.json({
            msg : errorMsg
        })
      }

    const token = jwt.sign(password, process.env.JWT_KEY);
   const response = await User.findOne({
        name,
        password:token,
        ac_no,
        email
    })
    if(response)
    {
        res.status(409).json({
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
      res.status(200).send("You have signed up successfully. Your token is" + token)
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