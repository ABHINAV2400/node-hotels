const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL, {})

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('connected to mongodb server');
})

db.on('error', (err)=>{
    console.error('Mongodb connection error:', err);
})

db.on('disconnected', ()=>{
    console.log('disconnected to mongodb server');
})

module.exports = db ;