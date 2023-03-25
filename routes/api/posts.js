const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Post = require('../../models/Post')
const Profile = require('../../models/Profiles')

const validatePostInput = require('../../validation/post')

// $route  GET api/posts/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'posts works' })
})

// $route  POST api/posts
// @desc   创建一个评论接口
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    // 判断isValid是否通过
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
      user_type: req.body.user_type,
    })

    newPost.save().then((post) => res.json(post))
  },
)

// $route  GET api/posts
// @desc   获取评论信息
// @access public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: 'No post record.' }))
})

// $route  GET api/posts/:id
// @desc   Get single post by post id
// @access public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostsfound: 'Cannot find this post.' }),
    )
})

// $route  DELETE api/posts/:id
// @desc   Delete signle post by post id
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // check if belongs to current user
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "You don't have the authorization!" })
          }

          post.remove().then(() => res.json({ success: true }))
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: 'Cannot find the post.' }),
        )
    })
  },
)

// $route  POST api/posts/like/:id
// @desc   Like a post by post id
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('delete begin')
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'You have liked this!' })
          }

          post.likes.unshift({ user: req.user.id })

          post.save().then((post) => res.json(post))
        })
        .catch((err) =>
          res.status(404).json({ likederror: 'Liking action get error.' }),
        )
    })
  },
)

// $route  POST api/posts/unlike/:id
// @desc   Unlike a post by post id
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not liked this before.' })
          }

          // Get the user id to delete
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id)

          post.likes.splice(removeIndex, 1)

          post.save().then((post) => res.json(post))
        })
        .catch((err) =>
          res.status(404).json({ likederror: 'Unlike action get error.' }),
        )
    })
  },
)

// $route  POST api/posts/comment/:id
// @desc   Add a comment to a post by post id
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)

    if (!isValid) {
      return res.status(400).json(errors)
    }

    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        }

        post.comments.unshift(newComment)

        // save
        post.save().then((post) => res.json(post))
      })
      .catch((err) => res.status(404).json({ postnotfound: '添加评论错误' }))
  },
)

// $route  DELETE api/posts/comment/:id
// @desc   Delete a comment by comment id
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id,
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Cannot find the comment.' })
        }

        // Find the index of the target comment
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id)

        post.comments.splice(removeIndex, 1)

        // save
        post.save().then((post) => res.json(post))
      })
      .catch((err) =>
        res
          .status(404)
          .json({ postnotfound: 'Delete comment action gets error.' }),
      )
  },
)

module.exports = router
