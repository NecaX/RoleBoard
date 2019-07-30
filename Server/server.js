const express = require('express');
var bodyParser = require('body-parser');

// Logica del servidor de websocket
require('./ws.js')

// Logica de la bbdd y los modelos
require('./database.js')
const User = require('./Models/User.js')

// App sera el controlador de rutas para el acceso a distintas partes del servidor
// que no tenga que ver con el WebSocket
var app = express();

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
  User.findOne(query, function(err, result) {
    if (err) throw err;
    if(result == null){
      // En caso negativo, lo creamos
      console.log(`Adding new player to database: ${username}`)
      var newUser = new User({id: username, pass: req.body['pass']})
      newUser.save(function(err, res){
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
  User.findOne(query, function(err, result) {
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