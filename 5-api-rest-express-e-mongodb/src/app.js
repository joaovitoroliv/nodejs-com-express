// Fazer API utilizando o Express
import express from 'express';

// Import Banco de Dados
import db from './config/dbConnect.js'

// Importar arquivo de rotas
import routes from './routes/index.js'

// Importar livros para fazer os testes
// import livros from './models/Livro.js'


// Testar conexão e prever erro - link entre terminal e o log do mongo
db.on("error", console.log.bind(console, 'Erro de conexão'));
// Abrir conexão
db.once("open", () => {
    console.log('Conexão com o banco feita com sucesso')
})

const app = express();

// Formatar num objeto do tipo Json
app.use(express.json())

// Usar routes
routes(app);

export default app
