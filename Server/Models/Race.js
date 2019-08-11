const mongoose = require('mongoose')
const RaceInfoSchema = new mongoose.Schema({
    info: String, //To Be Defined
})
/**
 * Esquema ampliable de los campos que tendra el Race
 * para guardarlo en la bbdd
 */

const RaceSchema = {
    icon: String,
    name: String,
    mod: {
        type: Map,
        of: Number
    },
    traits: [String],
    extra: RaceInfoSchema,
}

const RaceModel = mongoose.model('Race', RaceSchema)

module.exports = RaceModel