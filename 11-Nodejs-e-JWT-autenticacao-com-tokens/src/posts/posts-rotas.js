const postsControlador = require('./posts-controlador');
// Botar Middleware de Passport na rota de Post
// const passport = require('passport'); // DEPRECATED
// Importar middlewares do index.js de usuarios
const { middlewaresAutenticacao } = require('../usuarios')

module.exports = app => {
  app
    .route('/post')
    .get(postsControlador.lista)
    .post(
      // passport.authenticate('bearer', { session: false }), // DEPRECATED
      middlewaresAutenticacao.bearer,
      postsControlador.adiciona
    );
};
