// Fazer API utilizando o Express
import express from 'express';
const app = express();

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

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
})
// .json para retornar um json
app.get('/livros', (req, res) => {
    res.status(200).json(livros);
})

// Exportar arquivo para ser utilizado no server
export default app
