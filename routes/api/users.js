// @login & register
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const keys = require('../../config/keys')
const passport = require('passport')

const User = require('../../models/User')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// $route  GET api/users/test
// @desc   Test the api/users/ api
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'login works' })
})

// $route  POST api/users/register
// @desc   User sign up api
// @access public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Check if the email account is exist in the database
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'The email has already existed!' })
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        // add role type for a new user 11:20-1:31
        type: req.body.type,
      })

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err

          newUser.password = hash

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
        })
      })
    }
  })
})

// $route  POST api/users/login
// @desc   return token jwt passport
// @access public

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // if (!isValid) {
  //   return res.status(401).json(errors)
  // }

  const email = req.body.email
  const password = req.body.password
  // add type role for login - post
  const type = req.body.type

  //Search database by email and type 11:20 -12:34
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: 'Account not exists!' })
    }

    // match the password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const rule = { id: user.id, name: user.name, type: user.type }
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err
          res.json({
            success: true,
            token: 'Bearer ' + token,
          })
        })
        // res.json({msg:"success"});
      } else {
        return res
          .status(405)
          .json({ password: "The password doesn't match the account email!" })
      }
    })
  })
})

// $route  GET api/users/current
// @desc   return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      // get current user type - 11:20:1:34
      type: req.user.type,
    })
  },
)

module.exports = router
