exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id')
    table.string('username').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('passwordHash').notNullable()
    table.string('passwordSalt').notNullable()
  })
    .createTable('posts', (table) => {
      table.increments('post_id')
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.bigint('created_at').notNullable()
      table.bigint('last_modification')
      table.json('likes')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.user_id')
    })
}

exports.down = (knex) => {
  return knex.schema
    .dropTable('posts')
    .dropTable('users')
}
