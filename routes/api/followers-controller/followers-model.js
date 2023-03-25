//import mongoose from 'mongoose';
//import positionsSchema from './positions-schema.js'
const mongoose = require('mongoose')
const followerSchema = require('./follower-schema')
const followerModel = mongoose.model('FollowerModel', followerSchema)

module.exports = followerModel
