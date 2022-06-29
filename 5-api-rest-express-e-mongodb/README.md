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
  
