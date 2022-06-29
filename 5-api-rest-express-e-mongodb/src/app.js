// Fazer API utilizando o Express
import express from 'express';
const app = express();

// Formatar num objeto do tipo Json
app.use(express.json())

const livros = [
    {
        id: 1,
        "titulo": "O Senhor dos Aneis"
    },
    {
        id: 2,
        "titulo": "O Hobbit"
    }
]

// Root
app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
})

// Buscar todos os livros
app.get('/livros', (req, res) => {
    res.status(200).json(livros);
})

// Buscar livro pelo indexs
app.get('/livros/:id', (req, res) => {
    let index = buscaLivroPorId(req.params.id);
    res.json(livros[index]);
})

// Incluir Livro
app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso')
})

// Modificar livro pelo Index
app.put('/livros/:id', (req, res) => {
    let index = buscaLivroPorId(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.json(livros);
})

// Deletar Livro 
app.delete('/livros/:id', (req, res) => {
    // Atribuição via desestruturação
    let { id } = req.params;
    let index = buscaLivroPorId(id);
    // Apagar via Splice
    livros.splice(index, 1)
    res.send(`Livro ${id} removido com sucesso`);
})


function buscaLivroPorId(id) {
    return livros.findIndex(livro => livro.id == id)
}
// Exportar arquivo para ser utilizado no server
export default app
