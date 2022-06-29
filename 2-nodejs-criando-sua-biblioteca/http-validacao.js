// import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function manejaErros(erro){
    throw new Error(erro.message);
}

async function checaStatus(arrayURLs) {
    try{
        // promises async await
        const arrayStatus = await Promise
            .all(arrayURLs
                .map(async url => {
                    const res = await fetch(url);
                    // return res.status;
                    // Adicionando descrição do erro
                    return `${res.status} - ${res.statusText}`;
                }))
        return arrayStatus;
    } catch (erro){
        manejaErros(erro);
    }
}

function geraArraydeURLs(arrayLinks) {
    // Loop para cada objeto { chave: valor }
    // Método de objeto que retorna um array apenas com os 'valores'
    // Join tira 
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink).join())
}

// Função que monta o objeto
async function validaURLs(arrayLinks) {
    const links = geraArraydeURLs(arrayLinks);
    const statusLinks = await checaStatus(links);
    // Uso de operador de espalhamento - para retorna um objeto temos que colocar parenteses
    const resultados = arrayLinks.map((objeto, indice) => ({
        ...objeto,
        status: statusLinks[indice]
    }))
    return resultados;
}

export default validaURLs;