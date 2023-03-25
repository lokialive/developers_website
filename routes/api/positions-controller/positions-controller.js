const {findPositions,createPosition,updatePosition,deletePosition}  = require('./positions-dao.js')
const CreatePosition = async (req, res) => {
    const newPosition = req.body;
    const insertedPosition = await createPosition(newPosition);
    res.json(insertedPosition);
}

const FindPositions  = async (req, res) => {
    const positionId = req.params.pid;
    const positions = await findPositions(positionId)
    res.json(positions);
}

const UpdatePosition = async (req, res) => {
    const positionIdToUpdate = req.params.pid;
    const updates = req.body;
    const status = await updatePosition(positionIdToUpdate, updates);
    res.json(status);

}



const DeletePosition = async (req, res) => {
    const positionIdToDelete = req.params.pid;
    const status = await deletePosition(positionIdToDelete);

    res.json(status);
}


module.exports = function(app) {
    app.post('/api/positions', CreatePosition);
    app.get('/api/positions', FindPositions);
    app.put('/api/positions/:pid', UpdatePosition);
    app.delete('/api/positions/:pid', DeletePosition);
}