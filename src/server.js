const express = require('express') 
const cors = require('cors')
const dotenv = require('dotenv')

const routes = require('./routes')

// CONFIG
dotenv.config()

// SERVIDOR
const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(routes)

// PORT
app.listen(process.env.PORT || 3333)

console.log("SERVER IS RUNNING")
console.log("PORT: ", process.env.PORT)