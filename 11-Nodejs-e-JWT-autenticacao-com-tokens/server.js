require('dotenv').config() // Configura todas as variáveis de ambiente dentro do nosso programa
const app = require('./app');
const port = process.env.PORT || 3000;
const db = require('./database');

const routes = require('./rotas');
routes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
