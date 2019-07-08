import React from 'react';
import logo from './logo.svg';
import './App.css';


//Punto de entrada para el websocket
const url = 'ws://localhost:8080' //Cambiar a url dinámica
const connection = new WebSocket(url)

class App extends React.Component {  
  constructor(props){
    super(props); //Constructor padre

    //Los binding permiten usar las funciones en el constructor
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.updateCoordinates(e.data)
    }
  }
  /**
   * Funcion que controla el envio del formulario. Manda un mensaje con formato
   * "X: num Y: num" al servidor con las nuevas coordenadas
   */
  handleSubmit(){
    connection.send('X: ' + this.state.x + ' Y: ' + this.state.y) 
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
   * Funcion que actualiza las coordenadas.
   * Recibe un mensaje string del formato "X: num Y: num" que trata para conservar solo los numeros
   * @param {String} data String que contiene el mensaje con las coordenadas
   */
  updateCoordinates(data){
    this.setState({
      recvX: data.split('Y:')[0].substring(3),
      recvY: data.split('Y:')[1]

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
        <button onClick={this.handleSubmit}>Botonazo</button>

        <div>
          Received X value: {this.state.recvX}
        </div>
        <div>
          Received Y value: {this.state.recvY}
        </div>
      </header>
    </div>
  )
}
}

export default App;

