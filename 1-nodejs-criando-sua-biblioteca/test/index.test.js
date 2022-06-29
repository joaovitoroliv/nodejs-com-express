import pegaArquivo from '../capturando-links'

const arrayResult = [
    {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
]

// Testes relacionado ao pegaArquivo
describe('pegaArquivo::', () => {
    it('deve ser uma função', () => {
        expect(typeof pegaArquivo).toBe('function');
    })
    it('deve retornar array com resultados', async () => {
        const resultado = await pegaArquivo('/home/vagrant/projects/cursos-e-leituras/nodejs-com-express/1-nodejs-criando-sua-biblioteca/test/arquivos/texto1.md')
        expect(resultado).toEqual(arrayResult)
    })
    it('deve retornar mensagem que "Não há Links"', async () => {
        const resultado = await pegaArquivo('/home/vagrant/projects/cursos-e-leituras/nodejs-com-express/1-nodejs-criando-sua-biblioteca/test/arquivos/texto1_semlinks.md')
        expect(resultado).toBe('Não há Links');
    })
})

