const pessoas = require('./pessoasRoute.js')
const express = require('express')

module.exports = app => {
    // Teste
    // app.get('/', (req, res) => res.send('A rota está funcionando!'))

    // Usar body parser para fazer requisições do tipo Post
    app.use(express.json())
    // Usar rota de Pessoas
    app.use(pessoas)
}