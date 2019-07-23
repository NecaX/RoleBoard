const WebSocket = require('ws') 
const wss = new WebSocket.Server({ port: 8080 })

var idGen = 0 // Contador estatico de IDs a asignar
var activePlayers = {} // Array con las propiedades necesarias de los jugadores, por ejemplo, el orden
var cycle = 0 // Ciclo del juego, usado para ver a quien le toca

wss.on('connection', (ws, req) => {

  initializePlayer(ws, wss);
  updatePlayers(wss);

  ws.on('message', message => {
    var obj = JSON.parse(message)
    // Dependiendo del tipo de mensaje recibido, se realiza una accion u otra
    // En caso de que sea el turno del jugador, se realiza la accion
    if (cycle % Object.keys(activePlayers).length == activePlayers[obj['data']['id']]['turn']){
      switch(obj['type']){
        case 'updateCoordinates':
          // Actualiza las coordenadas del objeto en el servidor
          ws.x = obj['data']['x']
          ws.y = obj['data']['y']
          activePlayers[obj['data']['id']]['x'] = obj['data']['x']
          activePlayers[obj['data']['id']]['y'] = obj['data']['y']
          console.log(activePlayers)
          console.log(`Turno ${cycle}`)
          sendNewCoordinates(wss, message);
          // Por ahora se actualiza el turno cuando llega una nueva posicion
          increaseTurn();
          break;
      }
    }else{
      console.log('No es el turno de este jugador')
    }
  })

  ws.on('close', (code, reason) => {
    console.log('Disconnected player ' + ws.id);
    delete activePlayers[ws.id]
    console.log(Object.keys(activePlayers))
    updatePlayers(wss);
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
    activePlayers[idGen] = {'x': ws.x, 'y': ws.y};

    var players = generatePlayersList(wss);
    var data = {'id': idGen, 'players': players, 'cycle': cycle};
    var message = {'type': 'init', 'data': data};
    deliverTurns();
    ws.send(JSON.stringify(message));
  }

  /**
   * Funcion que actualiza todos los clientes con la lista de jugadores activos
   * @param {WebSocket Server} wss Servidor WebSocket con todos los clientes para generar la lista de jugadores activos
   */
  function updatePlayers(wss){
    var players = generatePlayersList(wss);
    var data = {'players': players};
    var message = {'type': 'updatePlayers', 'data': data};

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(message));
    });
  }

  function deliverTurns(){
    var newOrder = shuffle(Object.keys(activePlayers))
    for (var i = 0; i < newOrder.length; i++){
      activePlayers[newOrder[i]]['turn'] = i;
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function increaseTurn(){
    cycle++;
  }

  function generatePlayersList(wss){
    var players = []
    wss.clients.forEach(function each(client) {
      players.push({'id': client.id, 'x': client.x, 'y': client.y, 'turn': activePlayers[client.id]['turn']})
    });
    return players;
  }

})