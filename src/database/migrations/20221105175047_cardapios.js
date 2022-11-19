exports.up = function(knex) {
  return knex.schema.createTable('cardapios', function (table) {
    table.increments('id').primary()

    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')

    table.string('name', 100).notNullable()
    table.boolean('visible').notNullable().defaultTo(false)

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cardapios')
};
