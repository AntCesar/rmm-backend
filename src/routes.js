const express = require('express')
const routes = express.Router()

const AccountsController = require('./controllers/AccountsController')
const UsersController = require('./controllers/UsersController')
const CardapiosController = require('./controllers/CardapiosController')
const ItensController = require('./controllers/ItensController')

const auth = require('./middlewares/auth')
const { roles, permissions } = require('./middlewares/roles')

routes.get('/sys', (req, res) => {
  return res.json({
    version: '1.0',
    author: 'Antônio César',
  })
})

// LOGIN
routes.post('/login', AccountsController.register)

// USERS
routes.get('/users', auth, permissions([roles.ROOT]), UsersController.index)
routes.post('/users', auth, permissions([roles.ROOT]), UsersController.create)
routes.put('/users', auth, UsersController.update)
routes.delete('/users', auth, UsersController.delete)

// CARDAPIOS
routes.get('/cardapios', auth, permissions([roles.USER]), CardapiosController.index)
routes.get('/cardapios/:id', auth, permissions([roles.USER]), CardapiosController.show)
routes.post('/cardapios', auth, permissions([roles.USER]), CardapiosController.create)
routes.put('/cardapios/:id', auth, permissions([roles.USER]), CardapiosController.update)
routes.delete('/cardapios/:id', auth, permissions([roles.USER]), CardapiosController.delete)

// ITENS
routes.post('/cardapios/:cardapio_id/itens', auth, ItensController.create)

module.exports = routes