//import mongoose from 'mongoose';
//import positionsSchema from './positions-schema.js'
const mongoose = require('mongoose')
const positionsSchema = require('./positions-schema.js')
const positionsModel = mongoose.model('PositionsModel', positionsSchema);

module.exports = positionsModel;