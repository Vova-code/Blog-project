require('dotenv/config')

module.exports = {
  port: process.env.PORT,
  database: process.env.DB_DATABASE,
  dbUser: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
}
