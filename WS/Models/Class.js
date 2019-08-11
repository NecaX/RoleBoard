const mongoose = require('mongoose')
const ClassInfoSchema = new mongoose.Schema({
    info: String, // To Be Definded
})
/**
 * Esquema ampliable de los campos que tendra el Class
 * para guardarlo en la bbdd
 */

const ClassSchema = {
    icon: String,
    name: String,
    dice: String,
    role: String,
    ability: String,
    extra: ClassInfoSchema,
}

const ClassModel = mongoose.model('Class', ClassSchema)

module.exports = ClassModel