const followerModel = require('./followers-model')

//import positionsModel from './positions-model.js';

const findFollowers = (id) => followerModel.find({ companyId: id })
const createFollower = (position) => followerModel.create(position)

module.exports = {
  findFollowers,
  createFollower,
}
