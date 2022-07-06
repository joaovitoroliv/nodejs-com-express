const pessoas = require('./pessoasRoute.js')
const niveis = require('./niveisRoute.js')
const turmas = require('./turmasRoute.js')
const express = require('express')

module.exports = app => {
    // Teste
    // app.get('/', (req, res) => res.send('A rota está funcionando!'))

    // Usar body parser para fazer requisições do tipo Post
    app.use(
        express.json(),
        pessoas,
        niveis,
        turmas
    )
}