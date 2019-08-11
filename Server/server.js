const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
// Logica del servidor de websocket
require('./ws.js')

// Logica de la bbdd y los modelos
require('./database.js')
const User = require('./Models/User.js')
const Character = require('./Models/Character.js')

// App sera el controlador de rutas para el acceso a distintas partes del servidor
// que no tenga que ver con el WebSocket
var app = express();

// Parseamos el cuerpo de las peticiones como JSON
app.use(bodyParser.json());

// Parseamos las peticiones de imagenes como form data
app.use(bodyParser.urlencoded({extended: true}))

// Permitimos todas las conexiones de todos los origenes
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Servimos de manera estatica la carpeta de imagenes
app.use('/img', express.static('img'))

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

// SET IMAGE STORAGE WITH MULTER
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

/**
 * Ruta para subir los avatares de creacion de personaje 
 * TODO: Seguridad, comprobacion de archivos
 */
app.post('/avatar-upload', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  // La funcion json manda una respuesta en ese formato, en lugar de res.send(JSON.stringify...)
    res.json({path: file.path})
})

/**
 * Funcion para subir un nuevo personaje a la BBDD
 */
app.post('/create-character', (req, res) => {
  var newChar = new Character(req.body)
  newChar.save(function(err, res){
    if(err) throw err;
  })
  res.send({'success': true})
})


// El servidor estara funcionando en el puerto 8081 para no interferir con el servidor WebSocket
var server = app.listen(8081, function (){
  var host = server.address().address
  var port = server.address().port
  console.log(`Example app listening at http://${host}:${port}`)
})