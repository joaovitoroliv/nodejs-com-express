import express from 'express';
import LivroController from '../controllers/livrosController.js';

// Roteamento do express
const router = express.Router();

router
    .get('/livros', LivroController.listarLivros)
    .get('/livros/:id', LivroController.listarLivroPorId)
    .post('/livros', LivroController.cadastrarLivro)
    .put('/livros/:id', LivroController.atualizarLivro)
    .delete('/livros/:id', LivroController.deletarLivro)

export default router;