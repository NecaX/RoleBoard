const mongoose = require('mongoose')
const FeatSchema = new mongoose.Schema({
    name: String,
    desc: String,
    type: String, 
    bonus: {
        type: Map,
        of: Number
    }
})
/**
 * Esquema ampliable de los campos que tendra el Character
 * para guardarlo en la bbdd
 */
const CharacterSchema = {
    general: {
        type: Map,
        of: String
    },
    class: String,
    race: String,
    abilities: {
       type: Map,
       of: Number,
    },
    primweapon: String,
    secweapon: String,
    featsSelected: [FeatSchema],
    skillsSelected: {
        type: Map,
        of: Number,
     },
     campaign: {type: mongoose.Schema.Types.ObjectId, ref: 'Campaign'},
     user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}

const CharacterModel = mongoose.model('Character', CharacterSchema)

module.exports = {CharacterModel, CharacterSchema}