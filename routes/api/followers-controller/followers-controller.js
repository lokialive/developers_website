const { findFollowers, createFollower } = require('./followers-dao.js')
const CreateFollower = async (req, res) => {
  const insertedFollower = await createFollower({
    companyId: req.params.companyId,
    userId: req.params.userId,
    userHandle: req.params.userHandle,
  })
  res.json(insertedFollower)
}

const FindFollowers = async (req, res) => {
  const companyId = req.params.companyId

  const followers = await findFollowers(companyId)

  res.json(followers)
}

module.exports = function (app) {
  app.post('/api/follow/add/:companyId/:userId/:userHandle', CreateFollower)
  app.get('/api/follow/:companyId', FindFollowers)
}
