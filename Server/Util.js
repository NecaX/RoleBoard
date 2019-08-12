const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateCode() {
    var code = ''
    for (var i = 0; i < 3; i++){
        for (var j=0; j<4; j++){
            var index = Math.random() * alphanumeric.length
            code += alphanumeric.charAt(index)
        }
        code += '-'
    }
    return code.slice(0,-1);
}

module.exports = {generateCode}