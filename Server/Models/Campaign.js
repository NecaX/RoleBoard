const mongoose = require('mongoose')
const {CharacterSchema} = require('./Character.js')
const {ChapterSchema} = require('./Chapter.js')

/**
 * Esquema ampliable de los campos que tendra el Campaign
 * para guardarlo en la bbdd
 */
const CampaignSchema = {
    title: String,
    world: String,
    summary: String,
    dm: String,
    maxPlayers: Number,
    playersAdded: {type: Number, default: 0},
    code: String,
    games: [ChapterSchema],
    character: {
        type: Map,
        of: CharacterSchema,
    }
}

const CampaignModel = mongoose.model('Campaign', CampaignSchema)

module.exports = {CampaignModel}