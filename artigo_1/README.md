## Node.js: Descomplicando o trabalho com diferentes versões - [Artigo](https://www.alura.com.br/artigos/descomplicando-o-trabalho-com-node)

- Para conflito de versões é recomendado usar Node Version Manager (NVM):
  - NVM é um gerenciador de versões do Node.js
  - Nos permite baixar várias versões do Node.js em nossa máquina
  - Algumas opções disponíveis: *sh, dash, ksh, bash*
  - Pode ser utilizado em sistemas Unix, macOS e Windows WSL
  - Para instalar: 
    - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
    - Comandos: 
      - `nvsm ls-remote` para listar as versões do Node.js
      - `nvm install <versão>` para fazer download de uma versão específicar
      - `nvm ls` listas as versões instaladas na nossa máquina
      - `nvm use 10.16.3` para usar a versão 10.16.3 do Node.js
      



