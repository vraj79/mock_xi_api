const express = require('express');
const cors = require('cors');

const connectDB = require('./database/db');
const userrouter = require("./user/user.route");

const app = express();
app.use(cors());
app.use(express.json());
app.use("", userrouter)

app.listen(8080, async (req, res) => {
    try {
        await connectDB();
        console.log(`http://localhost:8080`);
    } catch (error) {
        console.log(error.message);
    }
});
