const redis = require('redis');
// Objeto como argumento para configurar o cliente
module.exports = redis.createClient({ prefix: 'blacklist:' });