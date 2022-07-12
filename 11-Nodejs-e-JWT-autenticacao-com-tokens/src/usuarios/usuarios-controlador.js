const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');
// Para ler uma variável de ambiente no nosso programa


const jwt = require('jsonwebtoken')
function criaTokenJWT(usuario) {
  // Cabeçalho é gerado automaticamente e Assinatura é uma juncao dos dois
  // Criar o Payload
  const payload = {
    id: usuario.id
  };
  // Gerar o token e assinar ele baseado no payload e senha-secreta
  // const token = jwt.sign(payload, 'senha-secreta')
  // senha-secreta esta dentro de um arquivo .env
  const token = jwt.sign(payload, process.env.CHAVE_JWT)
  return token
}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email,
      });

      await usuario.adicionaSenha(senha)

      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  // Implementar a resposta depois de um login bem sucedido
  login: (req, res) => {
    // Atributo user é resultado do passport.authenticate
    const token = criaTokenJWT(req.user);
    // Enviar o token no cabeçalho da resposta
    res.set('Authorization', token)
    // Implementação da estrategia de autenticacao feita no middleware
    // Nesse caso, ja temos a certeza de que o usuario está autenticado
    // Status 204: "olhar cabeçalho de resposta pois podem ser uteis"
    res.status(204).send();
  },

  lista: async (req, res) => {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  },

  deleta: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
