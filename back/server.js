const express = require('express')
const cors = require('cors')
const pino = require('pino')
const knex = require('knex')
const { Model } = require('objection')

const knexfile = require('./knexfile.js')
const config = require('./config.js')

const app = express()
app.use(cors())
app.use(express.json())
const database = knex(knexfile)
Model.knex(database)

const publicRoutes = require('./routes/publicRoutes')
const usersRoutes = require('./routes/usersRoutes.js')
const postsRoutes = require('./routes/postsRoutes')

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

app.get('/', (req, res) => {
  logger.trace(req)
  res.status(418).send({ yourOrder: '🍵' })
})

publicRoutes({ app, logger })
usersRoutes({ app, logger })
postsRoutes({ app, logger })

app.listen(config.port, () => logger.info(`App started on port: ${config.port}`))
