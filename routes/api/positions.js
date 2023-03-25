const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Positions = require('../../models/Positions.js')


// $route  GET api/posts/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: 'positions works' })
})


// $route  GET api/positions
// @desc   获取评论信息
// @access public
router.get('/', (req, res) => {
    Positions.find()
        .sort({ date: -1 })
        .then((positions) => res.json(positions))
        .catch((err) => res.status(404).json({ nopostsfound: 'No position record.' }))
})

module.exports = router