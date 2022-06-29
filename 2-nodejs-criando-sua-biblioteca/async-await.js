import chalk from 'chalk';
// Não precisa instalar pq lib é nativa do node
import fs from 'fs';

// Usando async/await para resolver Promises
async function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8';
    // Bloco sucesso - try
    try{
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        console.log(chalk.green(texto));
    } catch (erro){
        tratarErro(erro);
    } finally {
        console.log(chalk.yellow('operação concluida'))
    }
}

function tratarErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no caminho'));
}

console.log(1);
pegaArquivo('./arquivos/texto1.md');
console.log(2);