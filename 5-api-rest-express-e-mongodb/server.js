import app from './src/app.js'
// Boa prática para envio para produção no futuro
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`)
})