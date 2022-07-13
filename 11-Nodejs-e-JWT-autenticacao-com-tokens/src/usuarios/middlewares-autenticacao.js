const passport = require('passport')

module.exports = {
    local: (req, res, next) => {
        passport.authenticate(
            'local',
            { session: false },
            (erro, usuario, info) => {
                // Tratar erros de login:

                if (erro && erro.name === 'InvalidArgumentError') {
                    return res.status(401).json({ erro: erro.message });
                }
                if (erro) {
                    return res.status(500).json({ erro: erro.message })
                }
                // Requisição mal formatada, usuario deve rever as credenciais
                if (!usuario) {
                    return res.status(401).json();
                }
                // Caminho feliz
                req.user = usuario;
                return next();
            }
        )(req, res, next);
    },
    bearer: (req, res, next) => {
        passport.authenticate(
            'bearer',
            { session: false },
            (erro, usuario, info) => {
                // Tratar os erros de token:

                // Erros vindos de JWTVerify
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({ erro: erro.message })
                }

                // Erro de Token Expirado disparado pelo JWTVerify
                if (erro && erro.name === 'TokenExpiredError') {
                    return res.status(401).json({ erro: erro.message, expiradoEm: erro.expiredAt })
                }

                // Qualquer outra coisa que nao estamos esperando
                if (erro) {
                    return res.status(500).json({ erro: erro.message })
                }
                // Usuario é false e erro é nulo - Requisição mal formatada
                if (!usuario) {
                    return res.status(401).json()
                }
                req.token = info.token;
                req.user = usuario;
                return next();
            }
        )(req, res, next);
    }
};