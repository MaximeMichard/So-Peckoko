const http = require('http'); // Importation package HTTP //
const app = require('./app'); // Importation du fichier app.js//

const normalizePort = val => {  // Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaine //
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000'); // Port écouter : 3000 (port par défaut)//
app.set('port', port);

const errorHandler = error => { // Recherche les différentes erreurs et les gère de manière appropriée. Ensuite enregistrée dans le serveur //
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); // Création serveur (use app) //

server.on('error', errorHandler);  // Ecouteur d'événement enregistré, Consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console // 
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


server.listen(port); // Serveur listen port : 3000 //
