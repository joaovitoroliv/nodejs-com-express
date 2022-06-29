# Node.js: API Rest com Express e MongoDB [Curso](https://cursos.alura.com.br/course/nodejs-api-rest-express-mongodb)
## Sumário

- [Criando um projeto em NodeJS](#criando-um-projeto-em-nodejs)
- [Trabalhando com o Express](#trabalhando-com-o-express)
- [Conectando com o MongoDB](#)
- [Evoluindo a API](#)
- [Aprimorar o projeto](#depurando-a-requisição-http)

## Criando um projeto em NodeJS:
- Versão do Node 16.14.0 
- Versão do npm 8.3.1
- Utilizaremos o Node.js juntamente com o Express e o banco de dados NoSQL MongoDB com o Mongoose para conectar ao banco de dados
- Configuração do MongoDB no ambiente Atlas para que seja possível rodar na nuvem
- Objetivo: construir uma API para a Livraria Alura
  - Endpoints necessários: Buscar relação de livros, buscar livro específico, criar um novo livro, editar alguma informação e excluir um livro.
- REST: Gerenciamento de recursos
  - Cada recurso tem uma URI
  - /livros /autores /editoras
  - Comunicação Stateless
- [Doc APIs Node](https://nodejs.org/api/)
- Instalação do nodemon: `npm install nodemon@2.0.15 -D`
- Criar arquivo arquivo `.gitignore` com escrito `node_modules` dentro para ignorar essa pasta ao subir para o repositório
- Comandos NPM:
  - 
  - npm home	Abre a página do projeto
  - npm repo	Abre o repositório de código do projeto
  - npm audit	Executa uma auditoria no projeto para identificar se existe alguma dependência com vulnerabilidade conhecida
  - npm update	Atualiza projetos para a última versão respeitando o package.json
  - npm outdated	Retorna a lista de dependências desatualizadas mostrando a versão mais recente
  - npm adduser	Adiciona um novo usuario no https://registry.npmjs.org para permitir a publicação de pacotes
  - npm publish	Faz a publicação do pacote no NPM

## Trabalhando com o Express:
- Utilizaremos o Express para agilizar o nosso desenvolvimento:
  - npm install express@4.17.3
  - Inicio ao arquivo app.js na pasta src
  - Inserir type: module no package.json para ECMAScript
  - `const PORT = process.env.PORT || 3000;` boa prática para o envio para produção no futuro
- Introdução sobre frameworks: quando usamos frameworks conseguimos agilizar nosso trabalho, já que nossos esforços se voltam para o desenvolvimento, em vez de nos preocuparmos tanto com detalhes de configurações e padrões de projeto.
- Express Application Generator - cria um esqueleto para aplicações express
  - Para instalar: `npm install express-generator -g`
  - Para utilizar: vá até o local/pasta, rode `express olamundo`
  - Em seguida: `cd olamundo` e `npm install`
  - Por fim: `npm start` e ir para http://localhost:3000
  - Podemos digitar http://localhost:3000/users e observar que já existe uma rota padrão cadastrada
- O que aprendemos nessa aula:
  - A instalar o Express e os benefícios de se usar um framework para o desenvolvimento de aplicações Web;
  - Criar um servidor local usando o Express e configurando-o para escutar requisições em uma porta específica do nosso computador;
  - Como estruturar as requisições da API, utilizando corretamente os verbos HTTP e padronizando o endpoint de acordo com o padrão REST;
  - Devolver dados como resposta às requisições, usando o padrão JSON;
  - Utilizar o Postman para fazer as requisições do tipo GET, POST, PUT e DELETE, cujas últimas três não conseguimos simular pelo navegador.

## Conectando com o MongoDB
- Porque conectar com um banco de dados? Para persistir os dados, i.e, não perder os dados a cada refresh
- Banco relacional vs NoSQL:
  - Que tipo de banco utilizar? 
    - Banco relacional:
      - Utilização de tabelas com linhas e colunas
      - Chaves primárias e estrangeiras: relacionamentos se dão através das chaves
      - Alguns bancos relacionais: MySQL, PostgreSQL e SQL Server
      - Palavras reservadas, exemplos:
        - SELECT * FROM livros WHERE id > 2 (recuperar todos os livros de id maior que dois)
        - DELETE FROM autores WHERE nome ilike '%Paulo Coelho' (exclusao na tabela de autores de nome Paulo Coelho)
    - Bancos NoSQL:
      - Interessante para armazenar muitos tipos de dados
      - Dados não precisam estar divididos em tabelas
      - Todos os dados podem estar armazenados numa mesma estrutura
      - Uso de Objetos pra informar tudo sobre um livro por exemplo
      - Tipos de armazenamento:
        - Documentos -> MongoDB (coleção de documentos do tipo JSON)
        - Chave-valor -> OracleNoSQL, InfinityDB
        - Grafos -> Neo4j
        - Colunas amplas -> Cassandra e Hbase
- Nesse curso iremos utilizar o [MongoDB com o Atlas](https://www.mongodb.com/pt-br/atlas) com conector [Mongoose](https://mongoosejs.com/)



  