const { Router } = require('express') // Ferramenta do Express para utilizar Rotas
const pessoaController = require('../controllers/PessoaController.js')

const router = Router()

// Isso só é possível pq pegaTodasAsPessoas foi definido como método estático
router.get('/pessoas', pessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id', pessoaController.pegaUmaPessoa)
router.post('/pessoas', pessoaController.criarPessoa)
router.put('/pessoas/:id', pessoaController.atualizarPessoa)
router.delete('/pessoas/:id', pessoaController.deletaUmaPessoa)

module.exports = router
