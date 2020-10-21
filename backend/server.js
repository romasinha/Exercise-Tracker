const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const mongoose = require('mongoose');


require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully")
})

const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.listen(3000, ()=>{
    console.log('server started')
})