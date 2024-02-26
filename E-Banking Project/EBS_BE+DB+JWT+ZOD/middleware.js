const User = require("./db");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const z = require('zod');

const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/.*(?=[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/.*(?=\d)/, 'Password must contain at least one digit');

const emailSchema = z.string().email('Invalid email format');

const accountNumberSchema = z.string().length(5, 'Account number must be 5 digits');


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



const validateUserInput = (req, res, next) => {
    const { name, password, email, ac_no } = req.body;

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
        let errorMsg = "Your password is invalid: " ;
        passwordResult.error.errors.forEach(errorMessage => {
          errorMsg = errorMsg+ errorMessage.message + ". ";
        });
        return res.status(400).json({ msg: `Invalid password: ${errorMsg}` });
    }

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
        return res.status(400).json({ msg: `Invalid email: ${emailResult.error.errors[0].message}` });
    }

    const accountNumberResult = accountNumberSchema.safeParse(ac_no);
    if (!accountNumberResult.success) {
        return res.status(400).json({ msg: `Invalid account number: ${accountNumberResult.error.errors[0].message}` });
    }

    next();
};

module.exports = {userMiddleware,validateUserInput};