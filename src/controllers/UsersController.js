const knex = require('../database')
const bcrypt = require('bcrypt')
const { roles } = require('../middlewares/roles')

module.exports = {
  // Index
  async index(req, res) {
    const users = await knex.select('id', 'username').from('users')
    return res.send(users)
  },

  // Show
  async show(req, res) {},

  // Create
  async create(req, res) {
    let { username, password } = req.body
    
    try {
      password = bcrypt.hashSync(password, Number(process.env.SALT))

      console.log(roles)
      const [id] = await knex('users')
      .insert({ username, password, role: roles.USER })
      .returning('id')

      return res.send ({
        id,
        success: true,
        message: 'user.create.ok'
      })
    } catch (error) {
      console.log(error)
      return res.send({
        success: false,
        message: 'user.create.nok'
      })
    }
  },

  // Update
  async update(req, res) {
    const { username, password } = req.body
    
    try {
      await knex('users').update({ username, password }).where({ id: req.user.id })
      return res.send ({
        success: true,
        message: 'user.update.ok'
      })
    } catch (error) {
      return res.send({
        success: false,
        message: 'user.update.nok'
      })
    }
  },

  // Delete
  async delete(req, res) {
    try {
      await knex('users').delete().where({ id: req.user.id })
      return res.send ({
        success: true,
        message: 'user.delete.ok'
      })
    } catch (error) {
      return res.send({
        success: false,
        message: 'user.delete.nok'
      })
    }
  }

}