const { randomBytes, pbkdf2Sync } = require('crypto')
const { Model } = require('objection')

class PostModel extends Model {
  static get tableName() {
    return 'posts'
  }

  static get idColumn() {
    return 'post_id'
  }
}

module.exports = PostModel
