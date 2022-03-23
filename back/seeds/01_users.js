const UserModel = require('../models/UserModel')
exports.seed = async function (knex) {
  await knex('users').del()
  const [marvelPasswordHash, marvelSalt] = UserModel.hashPassword('marvel1')
  const [dcPasswordHash, dcSalt] = UserModel.hashPassword('dcComics')
  await knex('users').insert([
    {
      user_id: 1,
      username: 'MarvelBoy',
      email: 'marvelboy@yopmail.com',
      passwordHash: marvelPasswordHash,
      passwordSalt: marvelSalt
    },
    {
      user_id: 2,
      username: 'DC-Boy',
      email: 'dcboy@yopmail.com',
      passwordHash: dcPasswordHash,
      passwordSalt: dcSalt
    }
  ])
}
