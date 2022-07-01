import express from 'express'
import autores from './autoresRoutes.js'
import livros from './livrosRoutes.js'

const routes = (app) => {
    // Método route
    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: "Curso de Node" })
    })
    // Método use para usar outras rotas ja declaras
    app.use(
        //Indicar que irei usar json e a rota de livros
        express.json(),
        livros,
        autores
    )
}

export default routes