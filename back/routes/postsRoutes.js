const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config')
const authMiddleware = require('./security/auth')
const PostModel = require('../models/PostModel')
const UserModel = require('../models/UserModel')

const postsRoutes = ({ app, logger }) => {

  const checkEligibility = (req, res) => {
    const { username: paramsUsername } = req.params
    const { authentication } = req.headers
    const { user: { username } } = jwt.decode(authentication, jwtSecret)

    if (paramsUsername !== username) {
      logger.error('🛑 AccessViolation: User trying to post doesn\'t correspond')
      res.status(403).send({ error: 'User\'s resource doesn\'t own this one' })
      return null
    }
    return username
  }

  app.post('/posts/add/:username', authMiddleware, async (req, res) => {
    const { title, content, author } = req.body

    if (checkEligibility(req, res) === null) {
      return
    }
    const username = checkEligibility(req, res)

    try {
      const user = await UserModel.query().findOne({ username })
      if (user === null || user.username !== author) {
        res.status(404).send({ errorMessage: 'User not found !' })
      }

      const newPost = await PostModel.query().insertAndFetch({
        title: title,
        content: content,
        created_at: Date.now(),
        author: author
      })
      res.send(newPost)
    } catch (err) {
      logger.error(err)
      res.status(500).send({ errorMessage: 'Something went wrong' })
    }
  })

  app.post('/posts/delete', authMiddleware, async (req, res) => {
    const { postId } = req.body

    try {
      await PostModel.query().deleteById(Number(postId))
      res.send('OK')
    } catch (err) {
      logger.error(err)
      res.status(500).send({ errorMessage: 'Something went wrong' })
    }
  })

  app.post('/posts/update', authMiddleware, async (req, res) => {
    const { postId, updatedValues } = req.body

    logger.info(req.body)

    try {
      const updatedPost = await PostModel.query()
        .patch({title: updatedValues.title, content: updatedValues.content, last_modification: Date.now()})
        .where('post_id', '=', postId)
      res.status(200).send(updatedPost)
    } catch (err) {
      logger.error(err)
      res.status(500).send({ errorMessage: 'Post haven\'t been updated' })
    }
  })

  app.get('/posts/all/:username', authMiddleware, async (req, res) => {
    const username = checkEligibility(req, res)

    const userPosts = await PostModel.query().where('author', username)
    res.send(userPosts)
  })
}

module.exports = postsRoutes
