const express = require('express')
const router = express.Router()

const CompanyFollowerList = require('../../models/CompanyFollowerList')

// $route  GET api/follow/test
// @desc   Return the json file got
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'company followers works' })
})

//GEt all followers by companyId
router.get('/:companyId', (req, res) => {
  CompanyFollowerList.find({ companyId: req.params.companyId })
    .then((res) => {
      res.json(res)
    })
    .catch((err) => res.status(404).json(err))
})

router.post('/add/:id/:userId/:userHandle', (req, res) => {
  // const newFollower = new CompanyFollowerList({
  //   companyId: req.params.id,
  //   userId: req.params.userId,
  //   userHandle: req.params.userHandle,
  // })
  // newFollower.save()
  CompanyFollowerList.create({
    companyId: req.params.id,
    userId: req.params.userId,
    userHandle: req.params.userHandle,
  }).then((data) => console.log(res.json(data)))
})

// CompanyFollowerList.findOne({ companyId: req.params.id }).then((list) => {
//   const newFollower = {
//     userId: req.params.userId,
//     userHandle: req.params.userHandle,
//   }
//   list.followers.unshift(newFollower)

//   list.save().then((list) => res.json(list))
// })

module.exports = router
