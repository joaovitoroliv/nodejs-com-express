// Representar a nossa coleção de livro
// Importar o mongoose e dizer que é um Schema
import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: { type: String },
        titulo: { type: String, required: true },
        autor: { type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true },
        editora: { type: String, required: true },
        numeroPaginas: { type: Number }
    }
);
// Definindo o nome que eu quero que de fato seja criado o banco
const Livros = mongoose.model('livros', livroSchema);

export default Livros;
