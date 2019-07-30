// La conexion con la bbdd se crea al arrancar el servidor 
// y no se cierra hasta que el servidor no muere

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://roleboard:roleboard@roleboard-idq8m.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });