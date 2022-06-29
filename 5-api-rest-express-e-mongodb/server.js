import app from './src/app.js'
// Boa prática para envio para produção no futuro
const PORT = process.env.PORT || 3000;

// OLD
// Criar servidor local com módulo nativo HTTP e usando require (old)
// const http = require('http')
// const PORT = 3000
// const rotas = {
//     '/': 'Curso de Node',
//     '/livros': 'Entrei na página de livros',
//     '/autores': 'Listagem de Autores',
//     '/editora': 'Pagina de Editora',
//     '/sobre': "Informacoes sobre o projeto"
// }

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end(rotas[req.url]);
// })
// server.listen(PORT, () => {
//     console.log(`Servidor escutando em http://localhost:${PORT}`)
// })
// OLD
app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`)
})