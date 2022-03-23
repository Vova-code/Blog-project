const PostModel = require('../models/PostModel')
const UserModel = require('../models/UserModel')

const publicRoutes = ({ app, logger }) => {
  app.get('/api/posts', async (req, res) => {
    const { username } = req.query

    if (username != null) {
      const { user_id: userId } = await UserModel.query().select('user_id').findOne({ username })
      const userPosts = await PostModel.query().where('user_id', Number (userId))
      res.send(userPosts)
      return
    }

    const allPosts = await PostModel.query()
    res.send(allPosts)
  })
}

module.exports = publicRoutes
