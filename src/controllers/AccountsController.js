const knex = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsersController = require('./UsersController')

module.exports = {
  async register(req, res) {
    try {
      const { username, password } = req.body

      const user = await knex.select().from('users').where({ username }).first()

      if(bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        }, 
          process.env.SECRET_KEY,
        {
          expiresIn: process.env.TOKEN_LIFE
        })

        return res.json({
          success: true,
          message: 'users.registration.ok',
          token,
        })
      } else {
        return res.json({
          success: false,
          message: 'users.registration.nok',
        })
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        success: false,
        message: 'users.registration.error',
      })
    }
  }
}