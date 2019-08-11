const mongoose = require('mongoose')
const FeatInfoSchema = new mongoose.Schema({
    info: String, //To Be Defined
})
/**
 * Esquema ampliable de los campos que tendra el Feat
 * para guardarlo en la bbdd
 */

const FeatSchema = {
    name: String,
    desc: String,
    type: String,
    bonus: {
        type: Map,
        of: Number,
    },
    extra: FeatInfoSchema,
}

const FeatModel = mongoose.model('Feat', FeatSchema)

module.exports = FeatModel