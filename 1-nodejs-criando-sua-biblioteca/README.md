# Node.js: criando sua biblioteca - [Curso](https://cursos.alura.com.br/course/nodejs-criando-biblioteca)

## Criando um projeto em Node.js

- Biblioteca: é um pacote de código utilizado para otimizar uma tarefa, evita a reescrita de código
- Versão do Node utilizada: 14.10.1
  - Uso do `nvm` para gerenciar as versões do Node
- Contexto do curso: fazer um sistema para abrir vários arquivos em formato markdown e verificar se os links estão quebrados.
- `npm init -y` - para iniciar um `package.json`
- `npm install -g <nome do pacote>` ou `yarn add global <nome do pacote>` - para instalar libs de modo global (evitar para nao poluir o diretório global)
  - OBS: Existem libs que precisam ser instaladas globalmente para funcionarem, é preciso verificar na documentação de cada uma
- *Instalamos a biblioteca chalk:* `npm install chalk`
- *Criar um arquivo .gitignore com `node_modules` lá dentro*
- Documentação Chalk: [Link](https://www.npmjs.com/package/chalk)
- Type: module no package.json para importar a biblioteca `chalk`
- Introdução ao CommonJS ou CJS: trata da importação e exportação de módulos/pedaços de código
  - Para exportar apenas uma função:
````javascript
module.exports = function soma(num1, num2) {
 return num1 + num2;
};
````
  - ou
````javascript
function soma(num1, num2) {
 return num1 + num2;
}
module.exports = soma;
````
  - Para exportar um objeto com funções:
````javascript
module.exports { multiplica, soma };
````
  - Para importar funções desestruturando o objeto
````javascript
const { multiplica, soma } = require('./caminho/arquivo');

const resultadoMult = multiplica(2, 2);
const resultadoSoma = soma(2, 2);
````
- Exportando módulos:
  - EcmaScript Modules (ESM) ou CommonJS (CJS)
  - ESM: 
    - export, export default { ... }
    - import { ... } from './caminho/arquivo'
- Através da documentação procuramos respostas para as seguintes perguntas:
  - Como eu importo os métodos da lib para o meu código?
  - Quais são os métodos e/ou palavras-chaves que a lib disponibiliza e quais os usos?
  - Quais (e quantos) são os argumentos que devo passar como parâmetro para que estes métodos funcionem? Strings? Números? Um array de informações?

  ## Carregamento de Arquivos:
- A lib fs: acessar arquivos que estão em outras pastas
  - Uso de underline (_) como parâmetro de erro para não precisar tratar os erros.

- Promises: o que irá acontecer quando o processamento dos textos for muito grande? Pode demorar muito e tratar o programa
  - Para isso utilizamos código assíncrono, com promises por exemplo.
  - Readfile com Promises: `fs.promises.readFile().then`
- Async/Await:
  - Mais uma forma de se resolver uma Promise
  - Uso do bloco `try...catch` para tratar os casos de sucesso/erro no código
  - Bloco `finally`: Bloco executado sempre independente da execução do código ter sido resolvida no `try` ou gerado um erro passado para o `catch`. Não recebe nenhum dado através de parênteses.

  ## Capturando Links:
  - Como extrair do texto a estrutura de Links entre colchetes/parenteses
  - Exressões Regulares: Ferramenta que serve para identificar padrões em estruturas de texto (strings) para que seja possível manipulá-las
    - Introdução ao uso do `regex`:
      - Regex são objetos que mapeiam padrões de texto por meio de uma linguagem própria, com sintaxe e regras específicas. Elas são uma ferramenta eficiente para resolver problemas de código que envolvem padrões e buscas textuais.
      - [Documentação](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions)
      - [Regex](https://regex101.com/)
      - Ir para `capturando-links.js`
- Validações de formulário: existem libs para validação de formulários com Javascript
  - A validação de formulários é uma das tarefas que podem consumir muito tempo para desenvolver desde o início e normalmente não são features, ou seja, funcionalidades de um produto. Então, usamos as libs para focar nas partes mais importantes do desenvolvimento.
  - Exemplo de libs: [Joi](https://joi.dev/) e [Yup](https://www.npmjs.com/package/yup). Joi tem ambiente de testes que ajuda a visualizar melhor como utilizar os métodos da lib.
- Introdução aos métodos `match` e `exec`

## Usando a linha de comando

- Preocupação com a interação com o usuário e a nossa lib - `cli.js` - Command Line Interface
- Super comum passar caminhos e parâmetros para que as bibliotecas funcionem. Neste caso utilizamos:
````javascript
const caminho = process.argv;
console.log(pegaArquivo(caminho[2]));
````
- Caminho: Um caminho é onde se localiza um arquivo ou diretório (que também chamamos de pasta) no sistema de arquivos de um sistema operacional. é importante diferenciar caminho relativo de caminho absoluto, além de como acessá-los.
  - Caminho absoluto vs relativo: 
    - Caminho absoluto: chamamos de caminho absoluto quando a localização de um arquivo ou pasta é especificado a partir do diretório-raiz do sistema operacional.
    - Caminho relativo: um caminho relativo para um diretório ou arquivo é definido a partir de sua relação com o `pwd`, ou seja, o present working directory (diretório de trabalho atual). Na linha de comando, `pwd` também é o comando print working directory (imprimir o diretório de trabalho), que usamos justamente para saber onde na estrutura de diretórios do sistema operacional se encontra o diretório em que estamos.
- Criando scripts para interagir com o usuário:
  - Inserir script no Package.json `"cli": "node cli.js ./arquivos/texto1.md"`

## Validando Links:
  - Instalando node-fetch via `npm install node-fetch`
    - Versão 3.2.6
      - Logo tenho que subsituir:
        - `const fetch = require('node-fetch');` por `const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));` em `http-validacao.js`
- Fetch API e Promise.all: métodos assincronos, isto é, buscar resolver várias promessas de uma vez
- Neste curso começamos a abordar alguns conceitos importantes no desenvolvimento back-end e um deles é o de requisição/resposta, que são as duas pontas da comunicação cliente-servidor via HTTP.
- O que aprendemos:
  - Como utilizar a lib node-fetch para acessar URLs e devolver informações como código de status HTTP;
  - A utilizar o método Promise.all para acessar de forma assíncrona um array de URLs e receber o resultado;
  - A combinar o uso do node-fetch e de promessas com async/await para garantir que o código seja executado de forma assíncrona, retornando os resultados.

## Testes Unitários
- Usar o framework [Jest](https://jestjs.io/pt-BR/) para realização de testes unitários
  - `npm install --save-dev jest`
    - `--save-dev` é para salvar como dev-dependencies, pois é utilizado somente em etapa de desenvolvimento, não deve ir para a produção
- Criar diretório `test` com o arquivo `index.test.js`
- Muitos conflitos foram evitados utilizando o template de typescript ja configurado com JEST para ECMAScript modules.
- Um teste unitário, como os que fizemos, testa pequenas partes (ou unidades) de código; normalmente a menor parte “testável” do código. É o primeiro tipo de testes que fazemos, e além de testar funcionalidades nos ajudam a pensar em casos de uso; por exemplo, o que deve acontecer no caso de input incorreto de dados, ou falha em uma resposta. Ao testarmos as possibilidades, percebemos muitas vezes o que está faltando desenvolver.
- Além dos testes unitários, ainda existem outros tipos, como os testes de integração, que justamente integra diferentes módulos e envolve uma complexidade maior, e os testes de interface, que simulam a interface e os eventos que o usuário pode efetuar nela, como clique em um botão ou preenchimento de um input.
