// Coleção de livros
import livros from '../models/Livro.js'

// Implementação dos métodos
class LivroController {

    static listarLivros = (req, res) => {
        // Encontra os livros, popula com os dados de autor e executa a seguinte linha de código.
        livros.find()
            .populate('autor')
            .exec((err, livros) => {
                res.status(200).json(livros);
            })
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;
        livros.findById(id)
            .populate('autor', 'nome')
            .exec((err, livro) => {
                if (err) {
                    res.status(400).send({ message: `${err.message} - Id do livro não localizado` })
                } else {
                    res.status(200).send(livro);
                }
            });
    }

    static cadastrarLivro = (req, res) => {
        // Criar um novo modelo de livro de acordo com o que veio no body da requisição
        let livro = new livros(req.body);
        // Persistir ele no banco de dados
        livro.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Falha ao cadastrar livro` })
            } else {
                // Uso do método toJSON para transformar para JSON e mostrar pro usuário
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static atualizarLivro = (req, res) => {
        // Qual é o id do livro e o conteúdo que irei substituir
        // Endereço da rota - ID / Corpo da requisição - Conteúdo que será atualizado
        const id = req.params.id;
        livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'O livro foi atualizado com sucesso' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }

    static deletarLivro = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Não foi possível deletar o livro` })
            } else {
                res.status(200).send({ message: 'Livro deletado com sucesso' })
            }
        })
    }

    static listarLivrosPorEditora = (req, res) => {
        const editora = req.query.editora
        livros.find({ 'editora': editora }, {}, (err, livros) => {
            res.status(200).send(livros);
        })
    }
}

export default LivroController