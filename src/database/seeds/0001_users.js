const bcrypt  = require('bcrypt'); 
const { roles } = require('../../middlewares/roles')

exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    { username: 'root',
      password: bcrypt.hashSync('root', Number(process.env.SALT)),
      role: roles.ROOT,
    },
  ])
}
