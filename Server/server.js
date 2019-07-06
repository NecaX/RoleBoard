// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
 
// server.listen(8080);
// // WARNING: app.listen(80) will NOT work here!

// app.get('/', function (req, res) {
//   res.send("Mensaje del servidor")
// });

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

    
const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 8080 })
 
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  function intervalFunc() {
    ws.send('Hello! Message From Server!!')
    console.log("Message")
  }
  setInterval(intervalFunc, 1500);
})