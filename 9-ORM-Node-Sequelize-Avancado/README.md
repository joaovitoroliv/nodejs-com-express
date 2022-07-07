# Node.js: ORM com NodeJS: avançando nas funcionalidades do Sequelize - [Curso](https://cursos.alura.com.br/course/orm-nodejs-avancando-sequelize)

## Sumário
- [Introdução](#)
- [Soft Delete (exclusão suave)](#soft-deleteexclusão-suave)
- [Escopo de modelo e validações](#escopo-de-modelo-e-validações)
- [Escopo de associação e operadores](#escopo-de-associação-e-operadores)
- [Transações](#transações)
- [Refatoração com serviços](#refatoração-com-serviços)

## Introdução
- Inicio a partir API com Sequelize e MySQL
- O que vamos aprender?
  - Mais ferramentas do Sequelize e como utilizá-las
  - Entender como o Sequelize traduz ferramentas do SQL
  - Como atender necessidads específicas de um projeto que vão alem do CRUD básico
  - Como utilizar o Sequelize para manter e garantir a integridade dos dados que estão sendo movimentados no banco
  - Como organizar melhor uma aplicação (ir além do MVC)
- Preparando o ambiente:
  - Git clone no [repositório](https://github.com/alura-cursos/1862-sequelize/tree/master)
  - Rode `npm install` para baixar as depedencias
  - Caso não tenha criado um DB MySQL em modo local, crie! Nesse caso já temos um banco de nome `escola_ingles` criado
  - Conferir os dados em `api/config/config.json`
````javascript
"development": {
    "username": "root",
    "password": "12345678",
    "database": "escola_ingles",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
````
  - Adicionar script em package.json: 
    - `"mysql": "mysql -h 127.0.0.1 -u root -p",` para rodar o MySQL
  - Instação da dependencia: `npm install --save mysql2`
  - Rodar comandos de migração para criar as tabelas no banco: `npx sequelize-cli db:migrate`
  - Estamos usando o Lint para melhorar a estilização do código

## Soft Delete(exclusão suave)
- REQUISITO: O cliente não gostaria que registros importantes do sistema, como as Pessoas, sejam apagados definitivamente do banco de dados
  - Paranoid: true
  - Para isso precisamos adicionar uma coluna 'deletedAt' nas tabelas do nosso db, como fazer isso usando sequelize?

## Escopo de modelo e validações
## Escopo de associação e operadores
## Transações
## Refatoração com serviços