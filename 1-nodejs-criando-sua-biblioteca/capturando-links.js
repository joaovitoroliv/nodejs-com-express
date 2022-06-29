import chalk from 'chalk';
import fs from 'fs';

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$%\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;
    // Enquanto o valor de temp continuar achando o regex, empurra no array de resultados um objeto
    while ((temp = regex.exec(texto)) !== null) {
        arrayResultados.push({ [temp[1]]: temp[2] })
    }
    // If Ternário - Se array de resultados === 0 -> Não há links. Se arrayResultados tiver conteudo -> Retorna esse array
    return arrayResultados.length === 0 ? 'Não há Links' : arrayResultados;
}

function tratarErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no caminho'));
}

async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch (erro) {
        tratarErro(erro);
    }
    // finally {
    //     console.log(chalk.yellow('operação concluida'))
    // }
}
export default pegaArquivo;
