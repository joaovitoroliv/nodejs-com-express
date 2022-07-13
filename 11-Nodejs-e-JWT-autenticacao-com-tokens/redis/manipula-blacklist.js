const blacklist = require('./blacklist')
// Ferramenta auxiliar pois no curso ainda nao conseguia usar Promises
const { promisify } = require('util')
const existsAsync = promisify(blacklist.exists).bind(blacklist)
const setAsync = promisify(blacklist.set).bind(blacklist)
const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function geraTokenHash(token) {
    // Cria algoritmo de Hash, escolhe a codificacao e joga no token
    return createHash('sha256')
        .update(token)
        .digest('hex')
}

module.exports = {
    // Dado um token, queremos adicionar o token a lista
    adiciona: async token => {
        // Recuperar tempo de expiração no payload do token
        const dataExpiracao = jwt.decode(token).exp
        const tokenHash = geraTokenHash(token)
        // Ferramenta para transformar em funcao assincrona
        // blacklist.set(token, '')
        await setAsync(tokenHash, '');
        blacklist.expireat(tokenHash, dataExpiracao)
    },
    // Queremos verificar se o token está na lista
    contemToken: async token => {
        const tokenHash = geraTokenHash(token)
        const result = await existsAsync(tokenHash);
        // Caminho feliz, token está na blacklist
        return result === 1;
    }
}