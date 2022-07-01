# Node.js: API Rest com Express e MongoDB [Curso](https://cursos.alura.com.br/course/nodejs-api-rest-express-mongodb)
## Sumário

- [Criando um projeto em NodeJS](#criando-um-projeto-em-nodejs)
- [Trabalhando com o Express](#trabalhando-com-o-express)
- [Conectando com o MongoDB](#conectando-com-o-mongodb)
- [Evoluindo a API](#evoluindo-a-api)
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
- Conteúdo Extra: BSON
  - BSON torna uma varredura mais fácil para o MongoDB]
- Conectando com o MongoDB Atlas para não precisar instalar uma versão local:
  - Criei uma organization 'Alura' e um  projeto 'Node-express'
  - Criei uma collection livros para armazenar meus livros e inseri um documento
- GUI: Graphical User Interface (Interface Gráfica do Usuário): usado para interagir e manipular os dados lançados no banco
- MondoDB Shell (mongosh): caso vá utilizar o banco de dados de forma local. Interessante que seja na versão community, pois é gratuito e satifastório para projetos pequenos e estudos.
- Mongo Compass: interface gráfica para que seja possível visualizar, manipular e analisar dados, criando coleções e documentos individuais. Consegue fazer a maioria das coisas que o Mongo Shell faz.
- Configurar banco no projeto via [Mongoose](https://mongoosejs.com/) v6.2.6:
  - `npm install mongoose@6.2.6`
  - Criar pastar src/config e arquivo dbConnect.js (arquivo que irá definir os parametros de conexao com o banco)
  - Database -> Connect -> Connect your application -> Copiar String e trocar o password
  - Tirar retryWrites e majority
  - Criar nova pasta `/src/models`: representa todos os modelos que representam uma coleção no banco, tudo que seja relacionado a regra de negócio e de como esta incluido no banco.
    - Livro.js criado
    - Uso do método find()
- O que aprendemos:
  - A diferença entre bancos de dados relacionais e NoSQL;
  - Como utilizar o MongoDB Atlas, que é o serviço de banco de dados na nuvem, onde você pode escolher hospedar seu banco em plataformas como Google Cloud Platform, AWS ou Azure;
  - Instalar e utilizar a biblioteca Mongoose que é uma solução baseada em esquemas (Schemas) para modelar o banco de dados;
  - Criar o schema de livros, para representar a coleção livros no banco de dados, definindo o como será o documento armazenado e os campos requeridos;
  - Fazer a conexão da API com o banco de dados, verificando se a mesma ocorreu com sucesso ou não.

## Evoluindo a API

- Evoluir arquitetura e separar em camadas: pasta controller e routes (Padrão MVC)
- MVC: Model-View-Controller (Conceito de responsabilidade única)
- Recapitulando:
  - Usar pasta routes para centralizar as rotas e index.js para centralizá-las
  - Usar models para definir Schemas
  - Usar controllers para definir o processo da requisição
- Parâmetro __v: parametro de versionamento, podemos não utilizá-lo, mas é interessante para controlar a versão dos modelos/schemas
- [Conclusão do CRUD](https://github.com/joaovitoroliv/nodejs-com-express/commit/6f876b3277d633bf5b8bd27a8b9be0e29876d9a0)

## Aprimorando o projeto 
- Adicionado controlador autoresController.js, modelo Autor.js e rota autoresRoutes.js (Usando como base o que foi feito para livros)
- A ideia é associar autores e livros, como fazer?
- O que eu quero? Quando cadastrar um livro, ao invés de colocar um nome do autor eu quero colocar o id do autor e receber todas as informações de autores
  - Mudar 'autor: {type: String, required: true}' para 'autor: {type: mongoose.Schema.Types.ObjectId, ref:'autores', required: true}'
  - Em livrosController:
- Fazendo assim conseguimos passar para livros no atributo autor, um objeto! Ou seja, associamos pelo Id
- .populate('autor', 'nome') -> para passar para livros apenas o atributo 'nome' contido no autor
- Os query params, ou parâmetros de consulta, são um conjunto definido de parâmetros anexados ao final de uma URL. Os query params são aquelas extensões da URL que ficam após o '?' e ajudam a definir um conteúdo ou ações com base nos dados passados.
  - Para adicionar vários parâmetros, um '&' é adicionado entre cada um. Eles podem ser criados por qualquer variação de tipos ou comprimentos de objetos, como String, Arrays e Numbers.