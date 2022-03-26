const PostModel = require('../models/PostModel')
const UserModel = require('../models/UserModel')

const publicRoutes = ({ app, logger }) => {
  app.get('/api/posts', async (req, res) => {
    const { username } = req.query

    if (username != null) {
      const { username: author } = await UserModel.query().select('username').findOne({ username })
      const userPosts = await PostModel.query().where('author', author)
      res.send(userPosts)
      return
    }

    const allPosts = await PostModel.query()
    res.send(allPosts)
  })
}

module.exports = publicRoutes
