exports.up = function(knex) {
  return knex.schema.createTable('itens', function (table) {
    table.increments('id').primary()

    table.integer('cardapio_id').notNullable()
    table.foreign('cardapio_id').references('cardapios.id').onDelete('CASCADE')

    table.string('name', 100).notNullable()
    table.string('description', 100)
    table.float('price').notNullable()
    table.string('img_url', 150)

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('itens')
};
