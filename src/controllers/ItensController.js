const knex = require('../database')

module.exports = {
  // Create
  async create(req, res) {
    const { cardapio_id } = req.params
    const { name, description, price, img_url } = req.body
    
    try {
      const [id] = await knex('itens')
        .insert({ name, description, price, img_url, cardapio_id })
        .returning('id')

      return res.send ({
        id,
        success: true,
        message: 'item.create.ok'
      })
    } catch (error) {
      return res.send({
        success: false,
        message: 'item.create.nok'
      })
    }
  },

  // Update
  async update(req, res) {
    const { user_id, id } = req.params
    const { name, visible } = req.body
    
    try {
      const [id] = await knex('cardapios')
        .update({ name, visible })
        .where({ user_id, id })

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
    const { user_id, id } = req.params
    
    try {
      await knex('cardapios').delete().where({ user_id, id })

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