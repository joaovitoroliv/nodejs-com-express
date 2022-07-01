import mongoose from "mongoose";
// Versão local:
// mongoose.connect('mongodb://localhost/my_database');

// Versão em nuvem:
mongoose.connect('mongodb+srv://alura:123@alura.3z3uno7.mongodb.net/alura-node');

let db = mongoose.connection;

export default db;