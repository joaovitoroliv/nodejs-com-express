import chalk from 'chalk'; //ECMAScript Modules
import fs from 'fs';//ECMAScript Modules

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (_, texto) => {
//         console.log(chalk.green(texto));
//     })
// }
// pegaArquivo('./arquivos/texto1.md');

function tratarErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no caminho'));
}

// function pegaArquivoComErro(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if (erro) {
//             tratarErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }
// pegaArquivoComErro('./arquivos/texto1.md');

function pegaArquivoAsync(caminhoDoArquivo) {
    const encoding = 'utf-8';
    // Método do filestystem assincrono
    fs.promises
        .readFile(caminhoDoArquivo, encoding)
        .then((texto) => console.log(chalk.blue(texto)))
        // catch para tratar erros
        .catch((erro) => tratarErro(erro))
}
// pegaArquivoAsync('./arquivos/texto11.md');
// module.exports = pegaArquivoAsync;
export default pegaArquivoAsync; 