import React from 'react';
import logo from './logo.svg';
import './App.css';const url = 'ws://localhost:8080'
const connection = new WebSocket(url)

var msg = ''
var cont = 0


class App extends React.Component {  
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeX = this.handleChangeX.bind(this);
    this.handleChangeY = this.handleChangeY.bind(this);

    this.state = {
      x: 0,
      y: 0,
      recvX: 0,
      recvY: 0,
    }
    connection.onopen = () => {
      //connection.send('Message From Client') 
    }
     
    connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`)
      console.log(error)
    }
    
    connection.onmessage = (e) => {
      console.log(e.data)
      this.updateCounter(e.data)
    }
  }

  handleSubmit(){
    connection.send('X: ' + this.state.x + ' Y: ' + this.state.y) 
  }

  handleChangeX(event) {
    this.setState({x: event.target.value});
  }

  handleChangeY(event) {
    this.setState({y: event.target.value});
  }

  updateCounter(data){
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

