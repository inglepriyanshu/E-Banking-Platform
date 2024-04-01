const express = require('express');
const router = express.Router();
const User = require("./db");
const {userMiddleware} = require("./middleware");
const {validateUserInput} = require("./middleware");
const jwt = require("jsonwebtoken");
const {generateToken} = require("./jwtUtils");
const {verifyToken} = require("./jwtUtils");

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
        password:token,
        balance:50000,
        loan_amount:0

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

    router.post("/signin", userMiddleware, async (req, res) => {
        try {
            const user = req.user;
    
            // Generate JWT token for authentication
            // const token = generateToken(user);
    
            // Send token in response
            res.status(200).json({ user });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });

    router.get("/names",async (req,res)=>
    {
        try {
            // Query the MongoDB database to fetch all names
            const names = await User.find({}, 'name');
    
            // Extract the names from the query result
            const nameList = names.map(user => user.name);
    
            // Send the list of names as a response
            res.json(nameList);
        } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error fetching names:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    })

    router.post("/fund-transfer", async(req,res)=>
    {
        const toName = req.headers.toname;
        const fromName = req.headers.fromname;
        const amountStr = req.headers.amount;
        const amount = parseInt(amountStr);

        const fromDoc = await User.findOne({name: fromName});
        const toDoc = await User.findOne({name:toName});

        if(fromDoc.balance<amount)
        {
            return res.status(403).json({msg:"Insufficient Balance"});
        }

        fromDoc.balance = parseInt(fromDoc.balance)- amount;
        toDoc.balance = parseInt(toDoc.balance) + amount;
    
        try {
            await fromDoc.save();
            await toDoc.save();
            return res.status(200).json({ msg: "Transaction successful" });
        } catch (error) {
            console.error("Error saving documents:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    

    })

    router.post("/loan", async (req, res) => {
        try {
            const name = req.headers.name;
            const loanAmountStr = req.body.loanAmount; // Parse loan amount from the request body
            const loanAmount = parseInt(loanAmountStr);
    
            const user = await User.findOne({ name: name });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            user.loan_amount = parseInt(user.loan_amount) + loanAmount;
            await user.save();
    
            return res.status(200).json({ message: "Loan amount updated successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
    
module.exports = router;