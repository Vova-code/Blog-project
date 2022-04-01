const PostModel = require('../models/PostModel')

const publicRoutes = ({ app, logger }) => {
  app.get('/api/posts', async (req, res) => {
    const allPosts = await PostModel.query()
    res.send(allPosts)
  })
}

module.exports = publicRoutes
