const PositionsController = require('./routes/api/positions-controller/positions-controller.js')
const FollowerController = require('./routes/api/followers-controller/followers-controller')
//import PositionsController from "./routes/api/positions-controller/positions-controller.js";
//import express from 'express';
//import mongoose from "mongoose";
//const express = require('express')
//const mongoose = require('mongoose')
//import bodyParser from "body-parser";
//const bodyParser = require('body-parser')
//import passport from 'passport'
//const passport = require('passport')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const SearchController = require('./controller/search-controller.js')

const app = express()
app.use(cors())
app.use(express.json())

// import routes
//import users from './routes/api/users';
//import profile from './routes/api/profile';
//import posts from './routes/api/posts';
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
// const follows = require('./routes/api/follow')

// DB config
const db = require('./config/keys').mongoURI

// import body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to mongodb database
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

// Apply middleware to cross origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

// passport initialization
app.use(passport.initialize())

require('./config/passport')(passport)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Use routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// Use search controller
SearchController(app)

// Use position controller
PositionsController(app)
FollowerController(app)

// Use search controller
SearchController(app)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
