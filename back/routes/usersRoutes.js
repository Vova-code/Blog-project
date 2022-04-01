const objection = require('objection')
const jwt = require('jsonwebtoken')

const authMiddleware = require('./security/auth')
const UserModel = require('../models/UserModel')
const { jwtSecret } = require('../config')
const { NotFoundError } = require('objection')


const usersRoutes = ({ app, logger }) => {

  app.post('/sign-up', async (req, res) => {
    const { username, email, password } = req.body

    const user = await UserModel.query().findOne({ username })

    if (user) {
      res.status(409).send({ singError: 'Unable to create this user' })
      return
    }

    const [hash, salt] = UserModel.hashPassword(password)

    try {
      const { passwordHash, passwordSalt, ...newUser } = await UserModel.query().insertAndFetch({
        username: username,
        email: email,
        passwordHash: hash,
        passwordSalt: salt
      })

      const token = getToken(newUser)
      res.status(201).send({ token: '', username: newUser.username })
    } catch (e) {
      logger.error(e.message)
      res.status(501).send({ serverError: 'Something went wrong during registration' })
    }
  })

  app.post('/sign-in', async (req, res) => {
    const { username, password } = req.body

    if (username === null || password === null) {
      res.status(422).send({errorMessage: 'Some params are missing in the request. username or password'})
    }

    const serchedUser = await UserModel.query().findOne({ username })

    if (!serchedUser) {
      logger.warn('User not found with username: ' + username)
      res.status(501).send({ serverError: 'Something went wrong during connection' })
      return
    }

    const [hashedPassword] = UserModel.hashPassword(password, serchedUser.passwordSalt)

    if (hashedPassword !== serchedUser.passwordHash) {
      res.status(401).send({ error: 'Unable to connect' })
      return
    }

    const token = getToken(serchedUser)
    res.send({ token: token, username: username })
  })

  app.get('/users/:username', authMiddleware, async (req, res) => {
    const { username: paramsUsername } = req.params
    const { authentication } = req.headers
    const { user: { username } } = jwt.decode(authentication)

    try {
      const { passwordHash, passwordSalt, ...searchedUser } = await UserModel.query().findOne({ username })

      if (!searchedUser) {
        res.status(404).send({ errorMessage: `User with username ${paramsUsername} doesn't exist` })
        return
      }

      res.send(searchedUser)
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(404).send({ errorMessage: `User with username '${paramsUsername}' does not exist` })
      }

      logger.error(err)
      res.status(500).send({ errorMessage: 'Something went wrong' })
    }
  })

  const getToken = (user) => {
    return jwt.sign({
      user: { userId: user.user_id, username: user.username }
    }, jwtSecret, { expiresIn: '30 min', algorithm: 'HS512' })
  }
}

module.exports = usersRoutes
