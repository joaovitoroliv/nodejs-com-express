const { Router } = require('express')
const express = require('express')
const routes = require('./api/routes') // Buscou o arquivo index.js

const app = express()

const port = 3000

// Chamar método routes
routes(app)

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}`))

module.exports = app