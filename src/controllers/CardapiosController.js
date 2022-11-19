const knex = require('../database')

module.exports = {
  // Index
  async index(req, res) {
    const cardapios = await knex
      .select('*')
      .from('cardapios')
      .where({ user_id: req.user.id })

    return res.send(cardapios)
  },

  // Show
  async show(req, res) {
    const { id } = req.params

    const cardapio = await knex
      .select(
        'cardapios.id',
        'cardapios.user_id',
        'cardapios.name',
        'cardapios.visible',
        'itens.id as item_id',
        'itens.name as item_name',
        'itens.description as item_description',
        'itens.price as item_price',
        ''
      )
      .from('cardapios')
      .innerJoin('itens', 'itens.cardapio_id', 'cardapios.id')
      .where({ user_id: req.user.id, 'cardapios.id': id })

    return res.send(cardapio)
  },

  // Create
  async create(req, res) {
    const { name, visible = false } = req.body
    
    try {
      const [id] = await knex('cardapios')
        .insert({ name, visible, user_id: req.user.id })
        .returning('id')

      return res.send ({
        id,
        success: true,
        message: 'cardapio.create.ok'
      })
    } catch (error) {
      return res.send({
        success: false,
        message: 'cardapio.create.nok'
      })
    }
  },

  // Update
  async update(req, res) {
    const { id } = req.params
    const { name, visible } = req.body
    
    try {
      const [id] = await knex('cardapios')
        .update({ name, visible })
        .where({ user_id: req.user.id, id })

      return res.send ({
        success: true,
        message: 'cardapio.update.ok'
      })
    } catch (error) {
      return res.send({
        success: false,
        message: 'cardapio.update.nok'
      })
    }
  },

  // Delete
  async delete(req, res) {
    const { id } = req.params
    
    try {
      await knex('cardapios').delete().where({ user_id: req.user.id, id })

      return res.send ({
        success: true,
        message: 'cardapio.delete.ok'
      })
    } catch (error) {
      return res.send({
        success: false,
        message: 'cardapio.delete.nok'
      })
    }
  }
}