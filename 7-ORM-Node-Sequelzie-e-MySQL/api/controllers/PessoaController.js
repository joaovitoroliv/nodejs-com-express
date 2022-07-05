const database = require('../models') // Buscou no Index.js por padrão

class PessoaController {
    // Quais métodos vou utilizar? CRUD
    // Pq o método é estático? Pq não preciso de uma instância de Pessoa para utilizar

    // Lista todas as pessoas
    static async pegaTodasAsPessoas(req, res) {
        try {
            // Método findAll do Sequelize (Substituiu as Queries do SQL)
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    // Lista Pessoa por ID
    static async pegaUmaPessoa(req, res) {
        // Precisamos pegar o ID
        const { id } = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne({
                where:
                {
                    // 'Coluna id: Query Params'
                    id: Number(id)
                }
            })
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    // Cria um Registro de Pessoa
    static async criarPessoa(req, res) {
        // Dados no corpo da requisição
        const novaPessoa = req.body;
        try {
            // Criar novo registro no banco com o método create
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(201).send(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    // Atualizar um registro
    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const novosDados = req.body;
        try {
            await database.Pessoas.update(novosDados,
                {
                    where: { id: Number(id) }
                }
            )
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    // Deleta uma pessoa por ID
    static async deletaUmaPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({
                where:
                {
                    id: Number(id)
                }
            })
            return res.status(200).json({ mensagem: `id ${id} foi deletado` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController