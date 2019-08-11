//requiring path and fs modules
const path = require('path');
const fs = require('fs');

// If argument folder does not exist, end script
if(process.argv[2] === undefined){
    return console.log('Parameter missing: node DatabaseStore.js folder')
}

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://roleboard:roleboard@roleboard-idq8m.mongodb.net/RoleBoard?retryWrites=true&w=majority', { useNewUrlParser: true });

var Model = require('./Models/'+ process.argv[2]+'.js')
//joining path of directory 
const directoryPath = path.join(__dirname, process.argv[2]);

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        let rawdata = fs.readFileSync(path.join(directoryPath, file));
        let element = JSON.parse(rawdata);
        var query = {name: element.name}
        // Buscamos si existe un jugador con ese nombre de usuario
        Model.findOne(query, function(err, result) {
            if (err) throw err;
            if(result == null){
            var newElement = new Model(element)
                newElement.save(function(err, res){
                    if(err) throw err;
                })
                }
            })
            });
});