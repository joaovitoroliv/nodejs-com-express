# SQL com MySQL: manipule e consulte dados - [Curso](https://cursos.alura.com.br/course/mysql-manipule-dados-com-sql)

## Sumário

- [Instalando e configurando o MySQL](#instalando-e-configurando-o-mysql)
- [Manipulando o banco de dados](#manipulando-o-banco-de-dados)
- [Gerenciando as tabelas do banco de dados](#gerenciando-as-tabelas-do-banco-de-dados)
- [Manutenção dos dados nas tabelas](#manutenção-dos-dados-nas-tabelas)
- [Consultando os dados](#consultando-os-dados)


## Instalando e configurando o MySQL
- Objetivo: Apresentar SQL para quem nunca viu SQL antes. 
- Utilizaremos o MySQL Workbench
- O que iremos aprender? 
  - Criar tabelas;
  - Apagar tabelas;
  - Inserir dados nas tabelas;
  - Substituir dados na tabela;
  - Apagar dados em uma tabela;
  - Consultar dados de uma tabela
- Grupo de Comandos:
  - DDL - Manipulação da estrutura do banco de dados relacional
  - DML - Gerenciamento dos dados propriamente dito
  - DCL - Gerenciamento de permissões do usuário e dos processos no banco
- História do MySQL
- Muito presente nos e-commerce
- Instalação:
  - [MySQL Community Edition (GPL) - MySQL on Windows (Installer & Tools)](https://dev.mysql.com/downloads/installer/)
  - IDE WorkBench

## Manipulando o banco de dados
- Como um banco de dados é organizado:
  - Banco de dados -> Diversas Entidades (Coleção de Tabelas)
  - Tabelas: 
    - Cada linha da tabela são denominados 'Registros'
    - Cada coluna na tabela são denominados 'Campos'
    - Chave Primária:
    - Chave Estrangeira: relaciona com outra tabela. Por isso, banco de dados relacional
    - Índice: serve para facilitar a busca no banco de dados
    - Grupo de Tabelas (Esquema): Assunto das tabelas
    - View: Grupamento de tabelas em consulta
    - Consulta: busca informações de uma ou mais tabelas
      - Caso seja mais de uma tabelas é necessário usar o 'JOIN';
      - Posso implementar filtros na minha consulta
      - Procedures e Funções
      - Trigger: é um alerta que é possível programar para que algo seja executado quando seja disparado
    - Primeiro `SELECT` realizado
- Criando um banco de dados: `CREATE DATABASE`
  - `CREATE DATABASE <nome do banco>;`
  - Charset/Collation: utf8/utf8_general_ci para caracteres especiais no banco
- Apagar banco de dados: `DROP DATABASE`
- Usar SQL por linha de comando:
  - `mysql -h 127.0.0.1 -u root -p`
  - Digitar password.

## Gerenciando as tabelas do banco de dados
- Tipos de dados: 
- Numéricos:
  - Números inteiros:
    - TINYIN - 1 Byte
    - SMALLINT - 2 Bytes
    - MEDIUMINT - 3 Bytes
    - INT - 4 Bytes
    - BIGINT - 8 Bytes
    - Propriedade Unsigned
  - Ponto Flutuante: 
    - FLOAT - Precisão Simples (4 bytes)
    - DOUBLE - Precisão dupla (8 bytes)
  - Bit:
    - Bit(1) - Pode ser 1 ou 0
    - Bit(2) - Pode ser 01,10,00 ou 11
  - Atributos dos campos numéricos:
    - SIGNED ou UNSIGNED
    - ZEROFILL - Preenche com 0 os espaços
    - AUTO_INCREMENT - Sequencia auto incrementada
      - Ex: 1,2,3,4,5...
    - OUT OF RANGE: Vão ocorrer quando os valores estourarem os limites
- Data e Hora:
  - DATE: 10000-01-01 até 9999-12-31
  - DATETIME: 1000-01-01 00:00:00 até 9999-12-31- 23:59:59
  - TIMESTAMP - 1970-01-01 00:00:01 UTC até 2038-01-19 UTC
  - TIME - -838:59:59 E 839:59:59
  - YEAR - 1901-2155 (Pode ser expresso no formato 2 ou 4 dígitos)
- Strings:
  - CHAR - Cadeia de caracteres com valor fixo (0 a 255)
  - VARCHAR - Cadeia de caracteres com valor variado
  - Exemplo:
    - CHAR(4) - "  aa" - Grava os espaços vazios
    - VARCHAR(4) - "aa"
  - BINARY - Gravo os bytes
  - VARBINARY - Mesma coisa do VARCHAR, nao grava espaços vazios
  - BLOB - Binário longo
  - TEXT - Texto longo
  - ENUM - Permite armazenar uma lista pré definida de valores
  - Atributos dos campos String:
    - SET e COLLATE - Que tipo de conjunto de caracteres serão suportados - utf8 por exemplo
- SPACIAL: Diz respeito a localizações e espaço
  - GEOMETRY - representa áreas
  - POINT - ponto no mapa
  - LINESTRING - linhas
  - POLYGON - representa áreas
- Criando tabela de sucos - Cadastro de Clientes
  - CPF do cliente
  - O nome completo
  - Endereço
  - Data de nascimento
  - Idade
  - Sexo
  - O limite de crédito para ele comprar produtos
  - O volume mínimo de sucos que ele pode comprar
  - Se ele ja realizou a primeira compra
- Execução:
````SQL
CREATE TABLE tbCliente
(CPF VARCHAR(11),
NOME VARCHAR(100),
ENDERECO1 VARCHAR(150),
ENDERECO2 VARCHAR(150),
BAIRRO VARCHAR(50),
CIDADE VARCHAR(50),
ESTADO VARCHAR(50),
CEP VARCHAR(8),
IDADE SMALLINT,
SEXO VARCHAR(1),
LIMITE_CREDITO FLOAT,
VOLUME_COMPRA FLOAT,
PRIMEIRA_COMPRA BIT(1))
````
- Criando Tabela de Cadastro de Produtos:
  - Código do produto
  - Nome do produto
  - Embalagem
  - Tamanho
  - Sabor
  - Preço de lista
  - Criação realizada via assistente
- Apagar tabelas:
  - Muito cuidado pois as tabelas possuem relacionamentos e podem impedir que a gente apague as tabelas.
  - Via Comando `DROP TABLE`
  - 
## Manutenção dos dados nas tabelas
- Inserir registros na tabela:
  - Exemplo:
````SQL
  INSERT INTO tbProduto(
    PRODUTO,
    NOME,
    EMBALAGEM,
    TAMANHO, 
    SABOR,
    PRECO_LISTA
    ) VALUES (
    '1040107', 'Light - 350ml - Melância', 'Lata', '350 ml'. 'Melância', 4.56)
````
- Verificar o registro que foi inserido
  - `SELECT * from tbProduto`
- Inserir vários registros com um só script: Só fazer vários insert intos
- Alterando registros (informação que já existe na tabela)
- Precisamos usar chave primária aqui
````SQL
UPDATE tbProduto SET EMBALAGEM = 'PET', PRECO_LISTA = 2.46
WHERE PRODUTO = '1040107';
````

- Excluir registros:
- Tentar apagar o mesmo registro não da erro
````SQL
DELETE FROM tbProduto WHERE PRODUTO = '1040107';
````
- Incluindo a chave primária (condição de filtro é necessário):
  - Previne a inserção de registros duplicados
- Manipulando datas e campos lógicos:
````SQL
ALTER TABLE tbCliente ADD PRIMARY KEY (CPF);
ALTER TABLE tbCliente ADD COLUMN (DATA_NASCIMENTO DATE);
INSERT INTO tbCliente(
CPF, NOME, ENDERECO1, ENDERECO2, BAIRRO, CIDADE, ESTADO, CEP, IDADE, SEXO, LIMITE_CREDITO, VOLUME_COMPRA, PRIMEIRA_COMPRA, DATA_NASCIMENTO)
VALUES ('06215923664', 'Joao do badalo', 'Rua projetada A numero 10', '', 'Vila Roman', 'Ouro Preto', 'Minas Gerais', '35400000', 25, 'M', 10000.00, 2000, 0, '1996-07-29');
````

## Consultando os dados

- Para abrir um Script SQL: File -> Open SQL Script
````SQL
SELECT * FROM tbcliente;
SELECT CPF, NOME FROM tbcliente;
SELECT CPF, NOME FROM tbcliente LIMIT 5;
SELECT CPF AS CPF_CLIENTE, NOME AS NOME_CLIENTE FROM tbcliente;
SELECT NOME, CPF, SEXO, IDADE, DATA_NASCIMENTO FROM tbcliente;
````
- Para o SQL: 
  - A > B > C > D - Ordem alfabética para filtragem dos resultados
  - Valores com FLOAT fica complicado fazer uma busca, por exemplo: `WHERE PRECO_LIST = 16.008`. Poderia usar o Between com limites inferiores e superiores bem pequenos para conseguir listar o candidato exato.
- Filtrar campos que são datas:
  - Exemplo:
````SQL
SELECT * FROM tbcliente WHERE DATA_NASCIMENTO >= '1995-01-13'
SELECT * FROM tbcliente WHERE YEAR(DATA_NASCIMENTO) = 1995;
SELECT * FROM tbcliente WHERE MONTH(DATA_NASCIMENTO) = 10;
````
- Filtros compostos: Operador `AND` e `OR`
````sql
SELECT * FROM tbcliente WHERE IDADE >= 18 AND IDADE <= 22 AND SEXO = 'M';
SELECT * FROM tbcliente WHERE cidade = 'Rio de Janeiro' OR BAIRRO = 'Jardins';
SELECT * FROM tbcliente WHERE (IDADE >= 18 AND IDADE <= 22 AND SEXO = 'M') OR (cidade = 'Rio de Janeiro' OR BAIRRO = 'Jardins');
````
  - OBS: Essas condições de filtros compostos também podem ser usadas nas operações de DELETE e UPDATE, não somente nas de SELECT!!!
  
