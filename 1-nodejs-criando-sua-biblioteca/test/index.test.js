import pegaArquivoAsync from '../index.js'

test('deve ser uma função', () => {
    expect(typeof pegaArquivoAsync).toBe('function');
});