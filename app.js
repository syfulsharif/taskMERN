// Basic Library Import
const express = require('express');
const router = require('./src/router');
const app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const mongoose = require('mongoose');



// Cors Enable
app.use(cors());


// Security Implementation
app.use(helmet());
app.use(hpp());
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: true }));

const limiter = new rateLimit({windowMs: 15*60*1000, max: 100});
app.use(limiter);

// Connecting to Database
let URL ="mongodb://localhost:27017/taskMERN5"
let OPTION = {user:"", autoIndex:true};

mongoose.connect(URL,OPTION, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Database Connected');
    }
});

// Route Implement
app.use("/api", router);

app.use("*", (req, res) => {
    res.status(404).json({data: 'Not Found'});
})
