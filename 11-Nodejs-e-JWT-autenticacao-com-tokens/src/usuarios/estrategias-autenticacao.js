const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// Importar EstratégiaBearer
const BearerStrategy = require('passport-http-bearer').Strategy

const jwt = require('jsonwebtoken')

// Recebe o modelo do usuário
const Usuario = require('./usuarios-modelo')

const { InvalidArgumentError } = require('../erros')
const bcrypt = require('bcrypt')

// Não existe o usuário no Db
function verificaUsuario(usuario) {
    if (!usuario) {
        throw new InvalidArgumentError('Não existe usuário com esse email');
    }

}

// Verifica a senha que o cliente enviou e a senhaHash presente no DB
async function verificaSenha(senha, senhaHash) {
    // Usar bcrypt compare retorna uma Promise, portanto async/await
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('Email ou senha inválidos');
    }
}
// Declarar como estamos utilizando nossas credenciais e não estamos conceito de sessão
passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try {
            const usuario = await Usuario.buscaPorEmail(email);
            verificaUsuario(usuario);
            await verificaSenha(senha, usuario.senhaHash);
            done(null, usuario); // Ta autenticado
        } catch (erro) {
            done(erro);
            // done é função callback do passport autenticate
        }
    })
)

// Definir a Estratégia Bearer
passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                // Valida o token que recebemos do cliente juntamente com a chave secreta e recuperar o payload
                const payload = jwt.verify(token, process.env.CHAVE_JWT);
                const usuario = await Usuario.buscaPorId(payload.id);
                done(null, usuario);
            } catch (erro) {
                done(erro);
            }
        }
    )
)