const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const PositionsSchema = new Schema({
  companyId: {
    type: String,
  },
  positions: [
    {
      title: {
        type: String,
      },
      jobDescription: {
        type: String,
      },
      location: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Post = mongoose.model('post', PositionsSchema)
