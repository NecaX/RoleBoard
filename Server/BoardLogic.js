var activePlayers = {} // Array con las propiedades necesarias de los jugadores, por ejemplo, el orden
var cycle = 0 // Ciclo del juego, usado para ver a quien le toca


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
    if (username in activePlayers) {
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


module.exports = { sendNewCoordinates, initializePlayer, updatePlayers, deliverTurns, cycle, activePlayers }