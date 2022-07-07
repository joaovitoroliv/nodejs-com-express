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
  - Restaurar um registro caso a gente precise? Feito pelo controlador e route (restaurarPessoa) - uso do método restore()

## Escopo de modelo e validações
- REQUISITO: Para deixar a interface mais limpa, o cliente gostaria que na lista de Pessoas, por padrão, fossem exibidos somente os usuários ativos.
- Leitura sobre Escopo no Sequelize - O escopo é como chamamos as regras que definem quão acessível ou “visível” uma informação (por exemplo, uma variável) está, dependendo da parte da aplicação.
  - No caso do Sequelize, podemos determinar o escopo padrão (defaultScope) que justamente define quais restrições e definições serão utilizadas na query… por padrão
````javascript
{
    paranoid: true,
    defaultScope: {
      where: { ativo: true }
    }
  }
````
- Tudo funcionando, mas como eu faço para sobrescrever essa regra? Sobrescrever um Escopo Padrão?
  - `const todasAsPessoas = await database.Pessoas.scope('todos').findAll()`
  - .scope('<string no modelo>')

- REQUISITO: Foram percebidas algumas falhas de validação dos formulários por parte do front-end, o que resultou em dados de email inválidos no banco. É desejável que essa validação não seja responsabilidade exclusiva do front.
- [Validação](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#:~:text=Validations%20are%20checks%20performed%20in,to%20the%20database%20at%20all.)
- Validação feita no modelo. No nosso caso usaremos o modelo Pessoas primeiro:
````javascript
email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Dados do tipo email inválido'
        }
      }
    },
````
- Validações personalizadas para o 'Nome' via função:
````javascript
nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado.length < 3) throw new Error('O campo nome deve ter mais de 3 caracteres')
        }
      }
    },
````
- Para saber mais:
  - A documentação do Sequelize utiliza o termo restrição (constraint). Constraints são como regras que regem as tabelas; são usados para limitar os tipos de dados que podem ser inseridos em uma tabela/coluna e garantir a integridade e confiabilidade dos dados que estão em um banco. Eles podem ser aplicados tanto em colunas individuais como de forma geral para toda a tabela. Eles podem ser definidos diretamente no modelo, como por exemplo, unique:true é um constraint que serve para garantir que o nome de User de quem for utilizar o sistema seja sempre único
  - Diferente das validações, na verificação de constraints é executada uma query, e quem devolve o erro para o JavaScript é o SQL.
  - São constraints em SQL: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT E INDEX.
- O que aprendemos?
  - Definir um escopo de modelo padrão (defaultScope)
  - Definir outros escopos adicionais, conforme necessidade do projeto
  - Utilizar um escopo adicional com o método .findAll()
  - Validar dados de entrada utilizando validadores próprios do Sequelize
  - Refinar e customizar validações de campos utilizando funções e JS puro
## Escopo de associação e operadores
- Escopos de Associação:
  - IPC: "Os escopos de associação são definidos nas instâncias de um modelo, ao contrário dos próprios escopos de modelo."
  - [Doc](https://sequelize.org/docs/v6/advanced-association-concepts/association-scopes/)
  - Olhar para as associações presente no modelo pessoas.js
  ````javascript
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.scope('todos').findAll()
      return res.status(200).json(todasAsPessoas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  ````

  - scope: condição passada no where
  - as: nome que queremos usar para chamar os métodos
````javascript
Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      scope: { status: 'confirmado' },
      as: 'aulasMatriculadas'
    })
````
- Usando `mixins`:
  - Podemos resumir mixins em: classes que contêm métodos que podem ser utilizados por outras classes, sem a necessidade de herança direta. Dito de outra forma, um mixin fornece métodos que implementam um certo comportamento em objetos, sem poder ser utilizado sozinho, mas sim para adicionar esse comportamento a outras classes.
  - Objetivo: Consultar todas as matrículas confirmadas referentes a um estudante_id
  - Olhar para método pegaMatriculas em PessoaController.js
````javascript
static async pegaMatriculas(req, res) {
    const { estudanteId } = req.params
    try {
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
      // Percorra o banco buscando todas as matrículas confirmadas do estudante
      const matriculas = await pessoa.getAulasMatriculadas()
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
````
- Usando Operadores:
  - REQUISITO: O cliente gostaria de poder consultar as turmas abertas por intervalo de data, para não receber informações desnecessárias (como turmas antigas).
  - Parâmetros de Query String
    - Ex de requisição: `http://localhost:3000/turmas?data_inicial=2020-01-01&data_final=2020-03-01`
  - [Doc](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)
  - Iremos usar o `Op.gt e Op.lt`
- Funções Agregadoras:
  - REQUISITO: O cliente quer poder consultar as matrículas por turma e saber quais delas estão lotadas, para organizar melhor as matrículas. Em resumo, saber quantas matrículas existe em uma Turma
  - Iremos usar [Finders](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/)
  - Método `FindAndCountAll`
  - Rota `pegaMatriculasPorTurma` em `PessoasController.js`
  - Agora precisamos contar o numero de matriculas em uma turma com a rota `pegaTurmasLotadas`
  - Vamos utilizar o [Grouping](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#grouping)
  - Como inserir Queries de SQL através do Node? `Sequelize.literal`
  - Bastante informação nesse capítulo:
    - O que aprendemos?
      - O que são escopos de associação
      - Como definir um novo escopo de associação
      - Utilizar métodos próprios/mixins em tabelas associadas
      - Adicionar um filtro de busca via parâmetros de query
      - Utilizar operadores para fazer operações com dados
      - Retornar resultados filtrados através de operadores
      - Filtrar e enumerar registros com métodos "finders"
      - Ordenar os resultados com a opção "order"
      - Agrupar registros com "group"
      - Passar comandos do SQL dentro do Sequelize com Sequelize.literal()
## Transações
- REQUISITO: O cliente gostaria que, uma vez que o cadastro de um estudante fosse desativado, todas as matrículas relativas a este estudante automaticamente passassem a constar como “canceladas”.
  - Isto é, toda vez que desativar um estudante, cancele todas as suas matrículas
- O que acontece se der problema no DB enquanto tudo isso é feito? Veremos em Transações
  - O que são transações? Servem para garantir a integridade dos dados em operações como essa que fizemos, que altera várias tabelas de uma vez por exemplo
  - Caso dê algum problema é utilizada a operação de `rollback`
  - [Documentação das Transações](https://sequelize.org/docs/v6/other-topics/transactions/)
  - Iremos utilizar o método `sequelize.transaction` no meu controller
    - Exemplo:
````javascript
 database.sequelize.transaction(async (transacao) => {
        await database.Pessoas
          .update({ ativo: false }, { where: { id: Number(estudanteId) } }, { transaction: transacao })})
````
- O que é visualizado no `nodemon`:
````SQL
Executing (01c98652-ebb0-4cd0-bf45-f37be6a90aa1): START TRANSACTION;
Executing (default): UPDATE `Pessoas` SET `ativo`=?,`updatedAt`=? WHERE (`deletedAt` IS NULL AND (`ativo` = ? AND `id` = ?))
Executing (default): UPDATE `Matriculas` SET `status`=?,`updatedAt`=? WHERE (`deletedAt` IS NULL AND `estudante_id` = ?)
Executing (01c98652-ebb0-4cd0-bf45-f37be6a90aa1): COMMIT;
````
- OBS: No caso de queries SELECT e de alterações únicas no banco - por exemplo, uma inclusão em somente uma tabela, não há necessidade de se implementar transações. Em operações mais complexas, como alterações ou inserções que envolvam mais de uma tabela e/ou campos, elas se tornam necessárias para garantir que todas as operações envolvidas sejam ou finalizadas com sucesso, ou revertidas.

- Correções de Versionamento:
  - Erro do Nodemon: [Deprecated: Operator Aliases](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#deprecated-operator-aliases)
````javascript
(node:14349) [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.
(Use `node --trace-deprecation ...` to show where the warning was created)
````
 - Resolvido: Arquivo config.json modificado
 - Linha: `"operatorsAliases": false` foi removida
- Fim do Capítulo: O que aprendemos?
  - Criar métodos para atualizar mais de uma tabela
  - Adicionar transações às operações de banco via Sequelize
  - Interpretar avisos de versionamento e fazer correções
## Refatoração com serviços
- Criando Serviços:
  - Controladores começam a fazer muitas coisas, como por exemplo a PessoaController.js
  - Por isso, devemos adicionar uma camada chamada `services`
  - Ela vai servir para conectarmos com a database e processar os dados que iremos receber/enviar, iremos tirar essa responsabilidade do controlador e passaremos para os serviços.
  - Essa nova camada ficará entre os controladores e os modelos
    - Criar uma pasta `services` com Services.js
      - Teste com o pegaPessoasAtivas
  - Dessa forma os controladores podem continuar cuidando da validação, receber as requisições HTTP, receber os dados.. e envia isso para ser processado em um serviço e retorna a resposta desse serviço
- Adicionando Serviços:
- Passando Parâmetros
 - Observar método cancelarPessoa
   - É interessante que o controlador de Pessoas só tenha contato com o serviço de pessoas
- Fim do Módulo, O que aprendemos?
  - Criar uma camada de serviços
  - Transferir a interface com a database do controlador para o serviço
  - Atualizar o código no controlador para acessar os serviços
  - Criar serviços específicos que herdem métodos da classe principal
  - Organizar os serviços criando um ponto de entrada (index.js)
  - Criar métodos específicos para um serviço/modelo
  - Passar parâmetros de controladores para serviços
  - Conectar serviços entre si
  - Refatorar a aplicação para separar controladores e serviços

## Conclusão
- [Postman Collection](https://www.getpostman.com/collections/77d1d761fb21c9abc25c)

