import React from 'react';
import './App.css';
import GameBoard from './GameBoard';

var connection
class App extends React.Component {  
  constructor(props){
    super(props); //Constructor padre

    //Los binding permiten usar las funciones en el constructor
    this.sendCoordinates = this.sendCoordinates.bind(this);

    // El estado son las distintas variables que puede 
    // tener cada componente, y que se van modificando 
    // segun sea necesario
    this.state = {
      rows: 8, // Numero de filas que tendra el tablero
      columns: 6, // Numero de columnas que tendra el tablero
      playerId: '', //ID del jugador, entregado y generado por el servidor
      players: [], // Lista de jugadores activos
      server: 'localhost', // Servidor donde se conecta 
      username: 'default', // Nombre de usuario
      cycle: 0, // Ciclo de juego
    }

  }

  /**
   * Funcion que se llama en cuanto el componente carga por primera vez. 
   * Aqui se ejecuta el codigo que se necesita para el funcionamiento del componente
   * Pero que no tiene por que ejecutarse al arrancar la aplicacion, sino al arrancar el componente
   */
  componentDidMount(){
    this.setState({
      server: this.props.match.params.server,
      username: this.props.match.params.username
    });

    //Punto de entrada para el websocket
    const url = `ws://${this.props.match.params.server}:8080`
    console.log(url)
    connection = new WebSocket(url)

    // Funcion vacia por si es necesario en un futuro
    connection.onopen = () => {
      var data = {'username': this.props.match.params.username};
      var message = {'type': 'newPlayer', 'data': data};
      connection.send(JSON.stringify(message)) 
    }
    
    // Error log
    connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`)
      console.log(error)
    }
    
    // Cada vez que llega un mensaje nuevo
    // se procesa dependiendo del tipo
    connection.onmessage = (e) => {
      console.log(e.data)
      this.processMessage(e.data)
    }
  }

  /**
   * Funcion que procesa los mensajes recibidos del server.
   * Los mensajes son JSON del formato {'type': xxx, 'data': xxx}
   * @param {String} data String que contiene el mensaje a procesar
   */
  processMessage(data){
    var obj = JSON.parse(data)
    if(obj['type'] === 'init'){
      this.initializePlayer(obj['data'])
    }
    if(obj['type'] === 'updatePlayers'){
      this.updatePlayers(obj['data'])
    }
    if(obj['type'] === 'updateCoordinates'){
      this.updateCoordinates(obj['data'])
    }    
  }

  /**
   * Funcion que controla el envio del formulario. Manda un mensaje con formato
   * {'type': 'updateCoordinates', 'data': {'id: num, 'x': num, 'y': num}} al servidor con las nuevas coordenadas
   * @param {int} x Nueva coordenada X
   * @param {int} y Nueva coordenada Y
   */
  sendCoordinates(x,y){
    var data = {'id': this.state.playerId, 'x': x, 'y': y};
    var message = {'type': 'updateCoordinates', 'data': data};
    connection.send(JSON.stringify(message)) 
  }

  /**
   * Funcion que controla la inicializacion del jugador
   * Guarda el ID unico del jugador, y la lista de jugadores activos, asi como el ciclo de juego actual
   * @param {JSON} data Contiene el id unico, la lista de jugadores y el ciclo de juego
   */
  initializePlayer(data){
    this.setState({
      playerId: data['id'],
      players: data['players'],
      cycle: data['cycle'],
    })
  }

  /**
   * Funcion que actualiza la lista de jugadores activos
   * @param {JSON} data Contiene la lista de jugadores activos
   */
  updatePlayers(data){
    this.setState({
      players: data['players'] 
    })
  }

  /**
   * Funcion que actualiza las coordenadas de cada jugador. Ademas, actualiza el ciclo de juego
   * Recibe un mensaje JSON del formato {'id': xxx, 'x': xxx, 'y':xxx}
   * @param {JSON} data Objeto con las nuevas coordenadas del jugador correspondiente
   */
  updateCoordinates(data){
    var newPlayers = this.state.players
    var id = data['id']

    newPlayers.forEach((elem) => {
      if (elem['id'] === id){
        elem['x'] = data['x']
        elem['y'] = data['y']
      }
    })

    this.setState({
      players: newPlayers,
      cycle: this.state.cycle + 1,
    })
  }

  /**
   * Funcion que devuelve si es el turno del jugador
   */
  isMyTurn(){
    for (var elem in this.state.players){
      if (this.state.players[elem]['id'] === this.state.playerId){
        return (this.state.cycle % Object.keys(this.state.players).length == this.state.players[elem]['turn']);
      }
    }
  }

  render(){
    return (
      <div>
        <GameBoard  rows={this.state.rows} 
                    columns={this.state.columns} 
                    handleClick={this.sendCoordinates} 
                    players={this.state.players} 
                    cycle={this.state.cycle} 
                    playerId={this.state.playerId}
                    myTurn={this.isMyTurn()} 
                    />
      </div>
    )
  }
}

export default App;

