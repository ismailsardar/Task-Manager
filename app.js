/**
 * task-menage projects / app create
 * Date : 21/03/2023
 * auth: Ismile Sardar
 */
// localhost:5000/api/v1/registration
// Basic Lib Import
const express = require('express');
const app = new express();
const router = require('./src/routers/api');
const bodyParser = require('body-parser');
require('dotenv').config();

// Security Middleware Lib Import
const hpp = require('hpp');
const cors = require('cors');
const helmet= require('helmet');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const morgan = require('morgan');

// Database Lib Import
const mongoose = require('mongoose');

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(morgan('dev'));

// app.use(express.json());
// app.use(express.urlencoded({extended:false}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Body Parser Implement
app.use(bodyParser.json());

// Request Rate Limit
const limiter = rateLimiter({window:15*60*100,max:3000});
app.use(limiter);

// Mongo DB Database Connection
const URL="mongodb+srv://ismailDB:3GvJ185DX53sthBH@democluster.s18ct6t.mongodb.net/taskManager-R?retryWrites=true&w=majority";
mongoose.connect(URL)
        .then((value) =>{
            console.log('Database Connected Success');
        })
        .catch((err) => {
            console.log(err);
        });

//Routing Implement
app.use('/api/v1',router);

//undefined routing handel
app.use('*',(req,res)=>{
    res.status(404).json({status:'failed',data:'Not Found'});
});

module.exports = app;