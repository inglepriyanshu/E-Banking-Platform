const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config();
const router = require("./routes");

const port = 4002;


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use("/",router);







app.listen(port,()=>
{
    console.log(`Server running at port ${port}`);

});