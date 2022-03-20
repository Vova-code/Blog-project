import express from 'express'
import pino from 'pino'

import config from './config.js'

const app = express()
app.use(express.json())
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
  res.send({ message: 'You are on the entrypoint of Vova-blog social network' })
})

app.listen(config.port, () => logger.info(`App started on port: ${config.port}`))
