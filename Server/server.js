const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })
const express = require('express');
// App sera el controlador de rutas para el acceso a distintas partes del servidor
// que no tenga que ver con el WebSocket
var app = express();
var bodyParser = require('body-parser');

// La conexion con la bbdd se crea al arrancar el servidor 
// y no se cierra hasta que el servidor no muere
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://roleboard:roleboard@roleboard-idq8m.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var db
client.connect(err => {
  if(err) throw err
  db = client.db("RoleBoard")
});

var activePlayers = {} // Array con las propiedades necesarias de los jugadores, por ejemplo, el orden
var cycle = 0 // Ciclo del juego, usado para ver a quien le toca

wss.on('connection', (ws, req) => {

  ws.on('message', message => {

    var obj = JSON.parse(message)
    // Dependiendo del tipo de mensaje recibido, se realiza una accion u otra
    // En caso de que sea el turno del jugador, se realiza la accion
    switch (obj['type']) {
      case 'updateCoordinates':
        if (cycle % Object.keys(activePlayers).length == activePlayers[obj['data']['id']]['turn']) {
          // Actualiza las coordenadas del objeto en el servidor
          ws.x = obj['data']['x']
          ws.y = obj['data']['y']
          activePlayers[obj['data']['id']]['x'] = obj['data']['x']
          activePlayers[obj['data']['id']]['y'] = obj['data']['y']
          sendNewCoordinates(wss, message);
          // Por ahora se actualiza el turno cuando llega una nueva posicion
          increaseTurn();
        } else {
          console.log('No es el turno de este jugador')
        }
        break;
      case 'newPlayer':
        initializePlayer(ws, wss, obj['data']['username']);
        updatePlayers(wss);
        break;
    }

  })

  ws.on('close', (code, reason) => {
    console.log('Disconnected player ' + ws.id + " reason: " + reason + ' code: ' + code);
    // Elimina al jugador desconectado de la partida y vuelve a repartir turnos
    // Se puede modificar para que los turnos mantengan el orden
    if(code != 1005){ // Este codigo es el servidor forzando el cierre, es decir, una conexion invalida.
                      // En este caso, el servidor fuerza el cierre cuando el jugador ya se encuentra en la partida
      delete activePlayers[ws.id]
      deliverTurns();
    }
    updatePlayers(wss);


  })

  /**
   * Funcion que controla el broadcast de las coordenadas nuevas de un jugador a todo el mundo
   * @param {WebSocket Server} wss Servidor WebSocket que contiene todos los clientes
   * @param {String} message Mensaje JSON en formato String que se reenviara a todo el mundo
   */
  function sendNewCoordinates(wss, message) {
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
  function initializePlayer(ws, wss, username) {
    if(username in activePlayers){
      ws.close();
    }
    ws.id = username;
    // Inicializa las coordenadas en el servidor a 0
    let { x, y } = spawnPlayer();
    console.log(`X: ${x}, Y: ${y}`)
    ws.x = x;
    ws.y = y;
    activePlayers[username] = { 'x': ws.x, 'y': ws.y };
    var players = generatePlayersList(wss);
    var data = { 'id': username, 'players': players, 'cycle': cycle };
    var message = { 'type': 'init', 'data': data };
    // Cuando se conecta un nuevo jugador, se reparten los turnos de nuevo
    deliverTurns();
    ws.send(JSON.stringify(message));
  }

  /**
   * Funcion que actualiza todos los clientes con la lista de jugadores activos
   * @param {WebSocket Server} wss Servidor WebSocket con todos los clientes para generar la lista de jugadores activos
   */
  function updatePlayers(wss) {
    var players = generatePlayersList(wss);
    var data = { 'players': players };
    var message = { 'type': 'updatePlayers', 'data': data };

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(message));
    });
  }

  /**
   * Funcion que entrega el turno a cada jugador
   * Actualmente los entrega totalmente al azar
   * Se puede modificar para entregarlos con un sistema de d20
   */
  function deliverTurns() {
    var newOrder = shuffle(Object.keys(activePlayers))
    for (var i = 0; i < newOrder.length; i++) {
      activePlayers[newOrder[i]]['turn'] = i;
    }
  }

  /**
   * Funcion que desordena de manera aleatoria un array
   */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Funcion que actualiza el ciclo de juego.
   * Separada del codigo para llamarla cuando sea necesario
   */
  function increaseTurn() {
    cycle++;
  }

  /**
   * Funcion que genera el array de jugadores con sus campos correspondientes
   * Debido a su uso en multiples partes del codigo, se extrae a una funcion 
   * para poder escalar la estructura en un solo sitio
   * @param {WebSocket Server} wss Servidor WebSocket con todos los clientes para generar la lista de jugadores activos
   */
  function generatePlayersList(wss) {
    var players = []
    wss.clients.forEach(function each(client) {
      players.push({ 'id': client.id, 'x': client.x, 'y': client.y, 'turn': activePlayers[client.id]['turn'] })
    });
    return players;
  }

  /**
   * Funcion que genera las coordenadas de un nuevo
   * jugador en una posicion valida
   */
  function spawnPlayer() {
    var x = 0;
    var y = 0;
    var changeX = true;
    while (!positionValid(x, y)) {
      if (changeX) {
        x++;
      } else {
        x--;
        y++;
      }
      changeX = !changeX;
    }
    return {
      x: x,
      y: y
    }
  }

  /**
   * Funcion que comprueba que la posicion x,y no esta siendo ocupada
   * por ningun otro elemento
   * @param {int} x Coordenada X de la posicion
   * @param {int} y Coordenada Y de la posicion
   */
  function positionValid(x, y) {
    for (var player in activePlayers) {
      if (activePlayers[player]['x'] === x && activePlayers[player]['y'] === y) {
        return false;
      }
    }
    return true;
  }

})

// Parseamos el cuerpo de las peticiones como JSON
app.use(bodyParser.json());

// Permitimos todas las conexiones de todos los origenes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Prueba
 */
app.get('/', function (req, res) {
  var obj = {'id': 'prueba'}
  res.send(JSON.stringify(obj));
})

/*
 * Control de creacion de usuario 
 */
app.post('/signup', (req, res) => {
  var username =  req.body['username']
  var query = {id: username};

  // Buscamos si existe un jugador con ese nombre de usuario
  db.collection("players").findOne(query, function(err, result) {
    if (err) throw err;
    if(result == null){
      // En caso negativo, lo creamos
      console.log(`Adding new player to database: ${username}`)
      var newUser = {id: username, pass: req.body['pass']}
      db.collection("players").insertOne(newUser, function(err, res){
        if(err) throw err;
      })
      res.send({'success': true})
    }else{
      // En caso afirmativo, lo comunicamos
      res.send({'success': false})
    }
  })
})

/*
 * Control de acceso al sistema 
 */
app.post('/login', (req, res) => {
  var username =  req.body['username']
  var query = {id: username, pass: req.body['pass']};

  // Comprobamos que exista un usuario con la misma pass 
  // Y comunicamos el resultado
  db.collection("players").findOne(query, function(err, result) {
    if (err) throw err;
    if(result == null){
      res.send({'success': false})
    }else{
      res.send({'success': true})
    }
  })
  

})

// El servidor estara funcionando en el puerto 8081 para no interferir con el servidor WebSocket
var server = app.listen(8081, function (){
  var host = server.address().address
  var port = server.address().port
  console.log(`Example app listening at http://${host}:${port}`)
})