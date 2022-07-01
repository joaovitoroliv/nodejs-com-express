// Coleção de autores
import autores from '../models/Autor.js'

// Implementação dos métodos
class AutorController {

    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        })
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id;
        autores.findById(id, (err, autor) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - Id do autor não localizado` })
            } else {
                res.status(200).send(autor);
            }
        });
    }

    static cadastrarAutor = (req, res) => {
        // Criar um novo modelo de autor de acordo com o que veio no body da requisição
        let autor = new autores(req.body);
        // Persistir ele no banco de dados
        autor.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Falha ao cadastrar autor` })
            } else {
                // Uso do método toJSON para transformar para JSON e mostrar pro usuário
                res.status(201).send(autor.toJSON())
            }
        })
    }

    static atualizarAutor = (req, res) => {
        // Qual é o id do autor e o conteúdo que irei substituir
        // Endereço da rota - ID / Corpo da requisição - Conteúdo que será atualizado
        const id = req.params.id;
        autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'O autor foi atualizado com sucesso' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }

    static deletarAutor = (req, res) => {
        const id = req.params.id;
        autores.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Não foi possível deletar o autor` })
            } else {
                res.status(200).send({ message: 'autor deletado com sucesso' })
            }
        })
    }

}

export default AutorController