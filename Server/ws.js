const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })
var { sendNewCoordinates, initializePlayer, updatePlayers, deliverTurns, cycle, activePlayers } = require('./BoardLogic.js');

wss.on('connection', (ws, req) => {

    ws.on('message', message => {

        var obj = JSON.parse(message)
        console.log(cycle)
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
                    cycle++;
                } else {
                    console.log('No es el turno de este jugador')
                }
                break;
            case 'newPlayer':
                initializePlayer(ws, wss, obj['data']['username']);
                console.log(Object.keys(activePlayers).length)
                updatePlayers(wss);
                break;
        }

    })

    ws.on('close', (code, reason) => {
        console.log('Disconnected player ' + ws.id + " reason: " + reason + ' code: ' + code);
        // Elimina al jugador desconectado de la partida y vuelve a repartir turnos
        // Se puede modificar para que los turnos mantengan el orden
        if (code != 1005) { // Este codigo es el servidor forzando el cierre, es decir, una conexion invalida.
            // En este caso, el servidor fuerza el cierre cuando el jugador ya se encuentra en la partida
            delete activePlayers[ws.id]
            deliverTurns();
        }
        updatePlayers(wss);


    })

})