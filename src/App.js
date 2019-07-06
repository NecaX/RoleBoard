import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

// const WebSocket = require('ws')
const url = 'ws://localhost:8080'
const connection = new WebSocket(url)

var msg = ''
var cont = 0


 function App() {
  const element = (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Message: {msg}
        </p>
        <p>
          Received messages: {cont}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  connection.onopen = () => {
    connection.send('Message From Client') 
  }
   
  connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
    console.log(error)
  }
  
  connection.onmessage = (e) => {
    console.log(e.data)
    cont++
    msg = e.data
  }
  ReactDOM.render(element, document.getElementById('root'));
  return element
}



setInterval(App, 0);

export default App; 
