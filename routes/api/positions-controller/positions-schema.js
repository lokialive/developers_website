// import  mongoose from 'mongoose';
const mongoose = require('mongoose')
const schema = mongoose.Schema({
    companyId:String,
    title : String,
    jobDescription: String,
    location: String,

}, {collection: 'positions'});


module.exports = schema;