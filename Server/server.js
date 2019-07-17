const WebSocket = require('ws') 
const wss = new WebSocket.Server({ port: 8080 })

var idGen = 0 // Contador estatico de IDs a asignar

wss.on('connection', (ws, req) => {

  initializePlayer(ws, wss);
  updatePlayers(wss);

  ws.on('message', message => {
    var obj = JSON.parse(message)
    // Dependiendo del tipo de mensaje recibido, se realiza una accion u otra
    switch(obj['type']){
      case 'updateCoordinates':
        // Actualiza las coordenadas del objeto en el servidor
        ws.x = obj['data']['x']
        ws.y = obj['data']['y']
        sendNewCoordinates(wss, message);
        break;
    }
  })

  ws.on('close', (code, reason) => {
    console.log('Disconnected player ' + ws.id);
  })
  /**
   * Funcion que controla el broadcast de las coordenadas nuevas de un jugador a todo el mundo
   * @param {WebSocket Server} wss Servidor WebSocket que contiene todos los clientes
   * @param {String} message Mensaje JSON en formato String que se reenviara a todo el mundo
   */
  function sendNewCoordinates(wss, message){
    wss.clients.forEach(function each(client) {
      client.send(message);
    });
  }

  /**
   * Funcion que controla la inicializacion de un nuevo jugador activo.
   * Le asigna un nuevo ID unico, y aumenta el generador
   * Ademas, genera la lista de jugadores activos y se la comunica
   * @param {WebSocket Client} ws Cliente WebSocket a inicializar
   * @param {WebSocket Server} wss Servidor WebSocket con todos los clientes para generar la lista de jugadores activos
   */
  function initializePlayer(ws, wss) {
    idGen++;
    ws.id = idGen;
    // Inicializa las coordenadas en el servidor a 0
    ws.x = 0;
    ws.y = 0;
    var players = []
    wss.clients.forEach(function each(client) {
      players.push({'id': client.id, 'x': client.x, 'y': client.y})
    });
    var data = {'id': idGen, 'players': players};
    var message = {'type': 'init', 'data': data};
    ws.send(JSON.stringify(message));
  }

  /**
   * Funcion que actualiza todos los clientes con la lista de jugadores activos
   * @param {WebSocket Server} wss Servidor WebSocket con todos los clientes para generar la lista de jugadores activos
   */
  function updatePlayers(wss){
    var players = []

    wss.clients.forEach(function each(client) {
      players.push({'id': client.id, 'x': client.x, 'y': client.y})
    });

    var data = {'players': players};
    var message = {'type': 'updatePlayers', 'data': data};

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(message));
    });
  }

})