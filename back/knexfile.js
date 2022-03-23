const config = require('./config')

module.exports = {
  client: 'pg',
  connection: {
    user: config.dbUser,
    password: config.dbPassword,
    database: config.database,
  }
}
