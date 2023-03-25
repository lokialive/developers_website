// import  mongoose from 'mongoose';
const mongoose = require('mongoose')
const schema = mongoose.Schema(
  {
    companyId: String,
    userId: String,
    userHandle: String,
  },
  { collection: 'followers' },
)

module.exports = schema
