## Node.JS: Funções Assíncronas - [Artigo](https://www.alura.com.br/artigos/node-funcoes-assincronas)
- Processamento Síncrono e Assíncrono:
  - Processamento síncrono é aquele que acontece de forma sequencial e ordenado, seguindo uma fila, um após o outro.
  - Processamento assíncrono é quando os processos são executados ao mesmo tempo, sem que nada impeça o outro de começar enquanto o que foi iniciado anteriormente termine. Isto é, um processo pode iniciar mesmo que outro esteja em execução. Node.js usa processamento assíncrono.
- Usando Promises:
  - Promises é um objeto usado para processamento assíncrono. Uma promise representa um valor que pode estar disponível agora, no futuro ou nunca. 
  - Uma promessa pendente pode se tornar realizada com um valor ou rejeitada por um motivo (erro). Quando um desses estados ocorre, o método then do Promise é chamado, e ele chama o método de tratamento associado ao estado (rejected ou resolved).
- Melhorando o código com async e await:
  - Presente no Node.js desde a versão 7.6
  - Com eles podemos deixar o código simples e fácil.
    - Exemplo:
````javascript
async listar() {
const resultado = await connection.query('SELECT * FROM nome_da_databela');

<restante do código>
};
````
  - Pronto! Usamos uma função assíncrona (async), e dentro dela o “restante do código” só vai ser executado quando `connection.query('SELECT * FROM nome_da_databela')` terminar, ou seja a variável resultado vai receber o resultado que está “aguardando” (await) do SELECT no banco de dados.
- Conclusão:
  - Simples, rápido! Usar o async e await torna a usabilidade, escrita e a leitura fáceis de entender.