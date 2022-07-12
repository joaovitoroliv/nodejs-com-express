const bcrypt = require('bcrypt');
for (let custo = 6; custo < 18; custo++) {
    const tempoInicial = Date.now();
    bcrypt.hash('A', custo).then(
        () => console.log(`custo: ${custo}; tempo: ${Date.now() - tempoInicial} ms`)
    );
} 