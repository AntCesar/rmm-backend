exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()

    table.string('username', 25).notNullable().unique()
    table.string('password', 255).notNullable()
    table.enu('role', ['ROOT', 'USER']).notNullable()

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
