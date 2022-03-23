const { randomBytes, pbkdf2Sync } = require('crypto')
const { Model } = require('objection')

class UserModel extends Model {
  static get tableName() {
    return 'users'
  }

  static get idColumn() {
    return 'user_id'
  }

  static hashPassword(password, salt = randomBytes(32).toString('hex')) {
    return [pbkdf2Sync(
      password,
      salt,
      1000,
      32,
      'sha512'
    ).toString('hex'), salt]
  }
}

module.exports = UserModel
