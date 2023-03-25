const  positionsModel = require('./positions-model.js');

//import positionsModel from './positions-model.js';

const findPositions = () => positionsModel.find();
const createPosition = (position) => positionsModel.create(position);
const deletePosition = (pid) => positionsModel.deleteOne({companyId: pid});
const updatePosition = (pid, position) => positionsModel.updateOne({companyId: pid}, {$set: position})
//const FindPositions = function(){positionsModel.find();}
//const CreatePosition = function(position){ positionsModel.create(position);}
//const DeletePosition = function(pid) { positionsModel.deleteOne({companyId: pid});}
//const UpdatePosition = function (pid, position) {positionsModel.updateOne({companyId: pid}, {$set: position})}

module.exports = {
    findPositions,
    createPosition,
    deletePosition,
    updatePosition
}