const usuariosControlador = require('./usuarios-controlador');
// const passport = require('passport'); // Inserir Middleware de Autenticação // DEPRECATED
// Importar o middlewares
const middlewaresAutenticacao = require('./middlewares-autenticacao')

module.exports = app => {
  // Criar nova rota de login
  app
    .route('/usuario/login')
    // Inserir o middleware de autenticacao do passport com o controlador
    // Estrategia 'local' e não estamos usando sessões para o login
    // Middleware de Autenticação
    .post(middlewaresAutenticacao.local, usuariosControlador.login)

  app
    .route('/usuario/logout').get(middlewaresAutenticacao.bearer, usuariosControlador.logout);

  app
    .route('/usuario')
    .post(usuariosControlador.adiciona)
    .get(usuariosControlador.lista);

  app
    .route('/usuario/:id')
    .delete(
      // passport.authenticate('bearer', { session: false }), //DEPRECATED
      middlewaresAutenticacao.bearer,
      usuariosControlador.deleta);
};
