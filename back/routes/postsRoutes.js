const jwt = require('jsonwebtoken')

const authMiddleware = require('./security/auth')
const { jwtSecret } = require('../config')
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

  app.get('/posts/all/:username', authMiddleware, (req, res) => {
    const username = checkEligibility(req, res)
  })
}

module.exports = postsRoutes
