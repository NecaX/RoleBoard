import React from 'react';
import logo from './logo.svg';
import './App.css';


//Punto de entrada para el websocket
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)

class App extends React.Component {  
  constructor(props){
    super(props); //Constructor padre

    //Los binding permiten usar las funciones en el constructor
    this.sendCoordinates = this.sendCoordinates.bind(this);
    this.handleChangeX = this.handleChangeX.bind(this);
    this.handleChangeY = this.handleChangeY.bind(this);

    // El estado son las distintas variables que puede 
    // tener cada componente, y que se van modificando 
    // segun sea necesario
    this.state = {
      x: 0, // Coordenada X del formulario a enviar
      y: 0, // Coordenada Y del formulario a enviar
      recvX: 0, // Coordenada X recibida del servidor
      recvY: 0, // Coordenada Y recibida del servidor
      playerId: '', //ID del jugador, entregado y generado por el servidor
      players: [], // Lista de jugadores activos
    }

    // Funcion vacia por si es necesario en un futuro
    connection.onopen = () => {
      //connection.send('Message From Client') 
    }
    
    // Error log
    connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`)
      console.log(error)
    }
    
    // Cada vez que llega un mensaje nuevo (aka coordenadas nuevas)
    // se actualizan donde sea necesario
    connection.onmessage = (e) => {
      console.log(e.data)
      this.processMessage(e.data)
    }
  }

  /**
   * Funcion que controla el envio del formulario. Manda un mensaje con formato
   * {'type': 'updateCoordinates', 'data': {'x': num, 'y': num}} al servidor con las nuevas coordenadas
   */
  sendCoordinates(){
    var data = {'id': this.state.playerId, 'x': this.state.x, 'y': this.state.y};
    var message = {'type': 'updateCoordinates', 'data': data};
    connection.send(JSON.stringify(message)) 
  }

  /**
   * Funcion que controla el cambio del estado de X en el formulario. 
   * Tiene actualizado this.state.x en todo momento
   * @param {*} event Evento generado por el cambio provocado por el formulario
   */
  handleChangeX(event) {
    this.setState({x: event.target.value});
  }

  /**
   * Funcion que controla el cambio del estado de X en el formulario. 
   * Tiene actualizado this.state.y en todo momento
   * @param {*} event Evento generado por el cambio provocado por el formulario
   */
  handleChangeY(event) {
    this.setState({y: event.target.value});
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
   * Funcion que controla la inicializacion del jugador
   * Guarda el ID unico del jugador, y la lista de jugadores activos
   * @param {JSON} data Contiene el id unico y la lista de jugadores
   */
  initializePlayer(data){
    this.setState({
      playerId: data['id'],
      players: data['players'] 
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
   * Funcion que actualiza las coordenadas de cada jugador.
   * Recibe un mensaje JSON del formato {id: xxx, x: xxx, y:xxx}
   * @param {JSON} data Objeto con las nuevas coordenadas del jugador correspondiente
   */
  updateCoordinates(data){
    var newPlayers = this.state.players
    var id = data['id']

    newPlayers.forEach((elem) => {
      console.log(elem['id'])
      console.log(id)
      if (elem['id'] === id){
        elem['x'] = data['x']
        elem['y'] = data['y']
      }
    })

    this.setState({
      recvX: data['x'],
      recvY: data['y'],
      players: newPlayers,
    })
  }

  /**
   * Funcion que controla la creacion de filas de la tabla de manera dinamica
   * con la lista de jugadores activos.
   */
  renderPlayersData(){
    console.log('Render: ' + this.state.players)
    return this.state.players.map((player, index) => {
      return(
        <tr >
          <td>Player {player['id']}</td>
          <td>X: {player['x']}</td>
          <td>Y: {player['y']}</td>
        </tr>
      )
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form>
            <div>
            <label>
              X:
              <input type="text" value={this.state.x} onChange={this.handleChangeX}/>
            </label>
            </div>

            <div>
            <label>
              Y:
              <input type="text" value={this.state.y} onChange={this.handleChangeY}/>
            </label>
            </div>

          </form>
          <button onClick={this.sendCoordinates}>Botonazo</button>

          <div>
            Received X value: {this.state.recvX}
          </div>
          <div>
            Received Y value: {this.state.recvY}
          </div>
          <div>
            I'm player: {this.state.playerId}
          <table>
              Players:
              <tbody>
                {this.renderPlayersData()}
              </tbody>
          </table>
          </div>
        </header>
      </div>
    )
  }
}

export default App;

