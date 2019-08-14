const mongoose = require('mongoose')

/**
 * Esquema ampliable de los campos que tendra el Campaign
 * para guardarlo en la bbdd
 */
const CampaignSchema = {
    title: String,
    world: String,
    summary: String,
    dm: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    maxPlayers: Number,
    playersAdded: {type: Number, default: 0},
    code: String,
    games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chapter'}],
    character: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}

const CampaignModel = mongoose.model('Campaign', CampaignSchema)

module.exports = {CampaignModel}