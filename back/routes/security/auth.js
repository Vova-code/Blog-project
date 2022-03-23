const pino = require('pino')
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = require('jsonwebtoken')

const { jwtSecret } = require('../../config')
const UserModel = require('../../models/UserModel')

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: new Date(Date.now()).toLocaleString('fr-FR')
    }
  }
})

const authMiddleware = async (req, res, next) => {
  const { authentication } = req.headers

  try {
    const { user: { username } } = jwt.verify(authentication, jwtSecret)

    req.user = await UserModel.query().findOne({ username })
    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      logger.error(`Token error: ${err.message}`)
      res.send({error: 'Unable for you to access resource'})
      return
    }
    res.status(500).send({errorMessage: 'Somethinng went wrong during auth'})
  }
}

module.exports = authMiddleware
