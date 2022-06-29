#!/usr/bin/env node
// utilizado para a publicação - shebang

//const pegaArquivoAsync = require('./index'); OLD
import pegaArquivo from './capturando-links.js';
import chalk from 'chalk';
import validaURLs from './http-validacao.js';
// Comand-Line-Interface
// Porta de entrada para a aplicação
const caminho = process.argv;
console.log(caminho);

async function processaTexto(caminhoDeArquivo) {
    const resultado = await pegaArquivo(caminhoDeArquivo[2]);
    if (caminho[3] === 'validar') {
        console.log(chalk.yellow('links validados'), await validaURLs(resultado));
    } else {

        console.log(chalk.yellow('lista de links'), resultado);
    }
}
processaTexto(caminho);